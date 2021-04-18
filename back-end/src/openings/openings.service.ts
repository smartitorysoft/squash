import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Opening } from '../entities';
import { getConnection, QueryRunner, Repository } from 'typeorm';
import { OpeningDataDto } from './dto/opening-data.dto';
import { configService } from '../config/config.service';
import { UpdateOpeningDataDto } from './dto/update-opening-data.dto';
import BaseException from '../util/exceptions/base.exception';

interface transactionItem {
	(queryRunner: QueryRunner): Promise<any>;
}

@Injectable()
export class OpeningsService {
	constructor(
		@InjectRepository(Opening)
		private readonly repository: Repository<Opening>
	) {}

	async onApplicationBootstrap(): Promise<void> {
		const haveDefault = async (name: string) =>
			await this.repository.findOne({ name, isDefault: true });
		try {
			const saveDefaultOpening = async (name: string) => {
				if (!(await haveDefault(name))) {
					const {
						openingHour,
						closingHour
					} = configService.getDefaultOpeningHours(name);
					await this.repository.save({
						name,
						isDefault: true,
						openingHour: Number.parseInt(openingHour, 10),
						closingHour: Number.parseInt(closingHour, 10)
					});
					return true;
				}
				return false;
			};
			if (await saveDefaultOpening('weekday')) {
				console.info(`Default weekday opening generated.`);
			}
			if (await saveDefaultOpening('weekend')) {
				console.info(`Default weekend opening generated.`);
			}
		} catch (error) {
			console.error(
				'Failed to set the default rules. Fix the database, or the ENV file, and restart the program.'
			);
		}
	}

	static async inTransaction(
		method: transactionItem | transactionItem[] = null
	) {
		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction('SERIALIZABLE');
		try {
			const finalize = async () => {
				await queryRunner.commitTransaction();
			};
			if (method) {
				if (Array.isArray(method)) {
					for (let i = 0; i < method.length; i += 1) {
						if (method[i]) {
							await method[i](queryRunner);
						}
					}
					await finalize();
				} else {
					await method(queryRunner);
					await finalize();
				}
			}
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw err;
		} finally {
			await queryRunner.release();
		}
	}

	async findAll() {
		const items = await this.repository.find({
			where: { isDeleted: false },
			order: { isDefault: 'DESC', order: 'ASC' }
		});
		return items.map((item) => new OpeningDataDto(item));
	}

	async update(data: UpdateOpeningDataDto) {
		const methods: transactionItem[] = [];
		const defaults = await this.repository.find({ where: { isDefault: true } });
		const defaultIds = defaults.map((item) => item.id);
		if (data.create) {
			for (let i = 0; i < data.create.length; i += 1) {
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.save(Opening, data.create[i]);
				});
			}
		}
		if (data.update) {
			for (let i = 0; i < data.update.length; i += 1) {
				const item = data.update[i];
				const { id, name, rule, order } = item;
				delete item.id;
				if (defaultIds.includes(id) && (name || rule || order)) {
					throw new BaseException('400ope00');
				}
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(Opening, { id }, { ...item });
				});
			}
		}
		if (data.delete) {
			for (let i = 0; i < data.delete.length; i += 1) {
				const { id } = data.delete[i];
				if (defaultIds.includes(id)) {
					throw new BaseException('400ope01');
				}
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(
						Opening,
						{ id },
						{ isDeleted: true, name: null }
					);
				});
			}
		}
		await OpeningsService.inTransaction(methods);
	}
}
