import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, User } from '../entities';
import { getConnection, QueryRunner, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaymentType } from './enum/payment-type.enum';
import {
	IPaginationOptions,
	paginate,
	Pagination
} from 'nestjs-typeorm-paginate';
import { PaymentDataDto } from './dto/payment-data.dto';

@Injectable()
export class PaymentsService {
	constructor(
		@InjectRepository(Payment)
		private readonly repository: Repository<Payment>,
		private readonly usersService: UsersService
	) {}

	private async paginate(
		options: IPaginationOptions,
		searchOptions = {}
	): Promise<Pagination<PaymentDataDto>> {
		const page = await paginate<Payment>(this.repository, options, {
			order: { createdAt: 'DESC' },
			...searchOptions
		});
		const items = page.items.map((item) => new PaymentDataDto(item));
		return new Pagination<PaymentDataDto>(items, page.meta, page.links);
	}

	async findAll(
		options: IPaginationOptions
	): Promise<Pagination<PaymentDataDto>> {
		return this.paginate(options);
	}

	async findByUser(
		options: IPaginationOptions,
		user: User
	): Promise<Pagination<PaymentDataDto>> {
		return this.paginate(options, {
			where: {
				user: user
			}
		});
	}

	async updateCredits(user: User, queryRunner: QueryRunner): Promise<number> {
		let { sum } = await queryRunner.manager
			.createQueryBuilder()
			.select('SUM(payment.value)', 'sum')
			.from(Payment, 'payment')
			.where(
				'payment.userId = :userId and payment.isRevertible = :isRevertible',
				{
					userId: user.id,
					isRevertible: true
				}
			)
			.getRawOne();
		console.log('SUM');
		console.log(sum);
		sum = !sum ? 0 : sum;
		await queryRunner.manager.update(User, { id: user.id }, { credit: sum });
		return sum;
	}

	async create(
		user: User,
		value: number,
		type: PaymentType,
		afterward
	): Promise<Payment> {
		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction('SERIALIZABLE');
		try {
			const newPayment = await this.repository.create({ value, user, type });
			await queryRunner.manager.save(newPayment);
			await this.updateCredits(user, queryRunner);
			if (afterward) {
				const aft = await afterward(queryRunner, newPayment);
				await queryRunner.commitTransaction();
				return aft ? aft : newPayment;
			}
			await queryRunner.commitTransaction();
			return newPayment;
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw err;
		} finally {
			await queryRunner.release();
		}
	}

	async addCredit(userId: string, value: number): Promise<string> {
		const user = await this.usersService.getById(userId);
		const newPayment = await this.create(user, value, PaymentType.TOP_UP, null);
		return newPayment.id;
	}

	async chargeCredit(
		user: User,
		value: number,
		afterward = null
	): Promise<Payment> {
		return await this.create(user, value, PaymentType.CHARGE, afterward);
	}
}
