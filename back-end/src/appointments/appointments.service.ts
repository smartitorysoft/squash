import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, User } from '../entities';
import { QueryRunner, Repository } from 'typeorm';
import CreateAppointmentDto from './dto/create-appointment.dto';
import { PaymentsService } from '../payments/payments.service';

const COST = 10;

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly repository: Repository<Appointment>,
		private readonly paymentsService: PaymentsService
	) {}

	async create(dto: CreateAppointmentDto, user: User): Promise<string> {
		if (user.credit >= COST) {
			const afterward = async (queryRunner: QueryRunner, payment) => {
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
