import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, User } from '../entities';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaymentType } from './enum/payment-type.enum';
import {
	IPaginationOptions,
	Pagination,
	paginate
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
