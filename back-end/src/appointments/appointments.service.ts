import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, User } from '../entities';
import { Repository } from 'typeorm';
import CreateAppointmentDto from './dto/create-appointment.dto';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly repository: Repository<Appointment>,
		private readonly paymentsService: PaymentsService
	) {}

	async create(dto: CreateAppointmentDto, user: User): Promise<string> {
		// TODO ide kredit ellenorzes
		// TODO tranzakcioval kene megoldani
		const payment = await this.paymentsService.chargeCredit(user, -10);
		const newAppointment = await this.repository.create({
			begins: dto.begins,
			user,
			payment,
			court: dto.court
		});
		await this.repository.save(newAppointment);
		return newAppointment.id;
	}
}
