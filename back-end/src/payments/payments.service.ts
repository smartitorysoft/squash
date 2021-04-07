import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../entities/payment/payment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaymentType } from './enum/payment-type.enum';

@Injectable()
export class PaymentsService {
	constructor(
		@InjectRepository(Payment)
		private readonly repository: Repository<Payment>,
		private readonly usersService: UsersService
	) {}

	async addCredit(userId: string, value: number): Promise<string> {
		const user = await this.usersService.getById(userId);
		const newPayment = await this.repository.create({
			value,
			user,
			type: PaymentType.TOP_UP
		});
		await this.repository.save(newPayment);
		return newPayment.id;
	}
}
