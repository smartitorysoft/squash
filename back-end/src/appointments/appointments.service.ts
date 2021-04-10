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
import { AppointmentDataDto } from './dto/appointment-data.dto';
import { AppointmentDataAdminDto } from './dto/appointment-data-admin.dto';

const COST = 10;

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
			return new Pagination<AppointmentDataAdminDto>(
				page.items.map((item) => new AppointmentDataAdminDto(item)),
				page.meta,
				page.links
			);
		}
		return new Pagination<AppointmentDataDto>(
			page.items.map((item) => new AppointmentDataDto(item)),
			page.meta,
			page.links
		);
	}

	async findAll(
		options: IPaginationOptions
	): Promise<Pagination<AppointmentDataDto>> {
		return this.paginate(false, options);
	}

	async findAllAdmin(
		options: IPaginationOptions
	): Promise<Pagination<AppointmentDataAdminDto>> {
		return this.paginate(true, options);
	}

	async findByUser(
		options: IPaginationOptions,
		user: User
	): Promise<Pagination<AppointmentDataDto>> {
		return this.paginate(false, options, { where: { user } });
	}

	async create(dto: CreateAppointmentDto, user: User): Promise<string> {
		if (user.credit >= COST) {
			const afterward = async (queryRunner: QueryRunner, payment: Payment) => {
				const newAppointment = await this.repository.create({
					begins: dto.begins,
					user,
					payment,
					court: dto.court
				});
				return await queryRunner.manager.save(newAppointment);
			};
			const payment = await this.paymentsService.chargeCredit(
				user,
				-COST,
				afterward
			);
			return payment.id;
		} else {
			throw new HttpException('Not enough credit.', 400);
		}
	}
}
