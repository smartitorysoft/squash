import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, Payment, User } from '../entities';
import { QueryRunner, Repository } from 'typeorm';
import CreateAppointmentDto from './dto/create-appointment.dto';
import { PaymentsService } from '../payments/payments.service';
import {
	IPaginationOptions,
	paginate,
	Pagination
} from 'nestjs-typeorm-paginate';
import { AppointmentListDataDto } from './dto/appointment-list-data.dto';
import { AppointmentListDataAdminDto } from './dto/appointment-list-data-admin.dto';
import BaseException from '../util/exceptions/base.exception';
import { Status } from './enum/status.enum';
import { AppointmentTableDataDto } from './dto/appointment-table-data.dto';
import { AppointmentDataDto } from './dto/appointment-data.dto';
import { AppointmentDataAdminDto } from './dto/appointment-data-admin.dto';

const COST = 10;
const DAY = 24 * 60 * 60 * 1000;
const WEEK = 7 * DAY;

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly repository: Repository<Appointment>,
		private readonly paymentsService: PaymentsService
	) {}

	private async paginate(
		isAdmin: boolean,
		options: IPaginationOptions,
		searchOptions = {}
	): Promise<Pagination<any>> {
		const page = await paginate<Appointment>(this.repository, options, {
			order: { createdAt: 'DESC' },
			...searchOptions
		});
		if (isAdmin) {
			return new Pagination<AppointmentListDataAdminDto>(
				page.items.map((item) => new AppointmentListDataAdminDto(item)),
				page.meta,
				page.links
			);
		}
		return new Pagination<AppointmentListDataDto>(
			page.items.map((item) => new AppointmentListDataDto(item)),
			page.meta,
			page.links
		);
	}

	private async findByInterval(
		startTime: Date,
		endTime: Date,
		isAdmin: boolean
	): Promise<AppointmentDataDto[] | AppointmentDataAdminDto[]> {
		const items = await this.repository
			.createQueryBuilder('appointments')
			.leftJoinAndSelect('appointments.user', 'User')
			.leftJoinAndSelect('User.role', 'Role')
			.leftJoinAndSelect('User.profile', 'Profile')
			.where(
				'appointments.status != :isCanceled and appointments.status != :isDeleted and appointments.begins >= :startTime and appointments.begins < :endTime',
				{
					isCanceled: Status.CANCELED,
					isDeleted: Status.DELETED,
					startTime,
					endTime
				}
			)
			.orderBy('begins')
			.getMany();
		const mapFunc = isAdmin
			? (item) => new AppointmentDataAdminDto(item)
			: (item) => new AppointmentDataDto(item);
		return items.map(mapFunc);
	}

	async findAll(
		from: Date,
		days: number,
		isAdmin = false
	): Promise<AppointmentTableDataDto[]> {
		const tmp: AppointmentTableDataDto[] = [];
		from = AppointmentsService.getDayByDate(from);
		for (let i = 0; i < days; i += 1) {
			const startDate = new Date(from.getTime() + i * DAY);
			const endDate = new Date(from.getTime() + (i + 1) * DAY);
			tmp.push({
				date: startDate,
				reserved: await this.findByInterval(startDate, endDate, isAdmin)
			});
		}
		return tmp;
	}

	async findByUser(
		options: IPaginationOptions,
		user: User
	): Promise<Pagination<AppointmentListDataDto>> {
		return this.paginate(false, options, { where: { user } });
	}

	static getDayByDate(date: Date): Date {
		const tmp = date;
		tmp.setHours(0);
		tmp.setMinutes(0);
		tmp.setSeconds(0);
		tmp.setMilliseconds(0);
		return tmp;
	}

	async create(dto: CreateAppointmentDto, user: User): Promise<string> {
		if (user.credit >= COST) {
			const afterward = async (queryRunner: QueryRunner, payment: Payment) => {
				const newAppointment = await this.repository.create({
					begins: dto.begins,
					user,
					payment,
					court: dto.court,
					status: Status.PENDING
				});
				return await queryRunner.manager.save(newAppointment);
			};
			const newAppointment = await this.paymentsService.chargeCredit(
				user,
				-COST,
				afterward
			);
			return newAppointment.id;
		} else {
			throw new BaseException('400pay00');
		}
	}

	private async deleteById(
		isAdmin: boolean,
		id: string,
		user: User = null
	): Promise<boolean> {
		const appointment = await this.repository.findOne(
			isAdmin ? { id } : { id, user }
		);
		if (!appointment) {
			throw new BaseException('404apo00', 404);
		}
		if (appointment.status !== Status.PENDING) {
			throw new BaseException('400apo00', 400);
		}
		try {
			const timeDiff = appointment.begins.getTime() - new Date().getTime();
			if (timeDiff <= WEEK) {
				await this.repository.update(
					{ id },
					{ status: isAdmin ? Status.DELETED : Status.CANCELED }
				);
			} else {
				const afterward = async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(
						Appointment,
						{ id },
						{ status: isAdmin ? Status.DELETED : Status.CANCELED }
					);
				};
				await this.paymentsService.storno(appointment.payment, afterward);
			}
			return true;
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}
			throw new BaseException('500gen00', 500);
		}
	}

	async delete(id, user: User): Promise<boolean> {
		return await this.deleteById(false, id, user);
	}

	async deleteAdmin(id): Promise<boolean> {
		return await this.deleteById(true, id);
	}
}
