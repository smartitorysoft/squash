import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';
import CreatePaymentDto from './dto/create-payment.dto';
import CreatePaymentResponseDto from './dto/create-payment.response.dto';

@Controller('payments')
export class PaymentsController {
	constructor(private paymentsService: PaymentsService) {}

	@Post(':id')
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('users')
	@Operation('create')
	async create(
		@Body() dto: CreatePaymentDto,
		@Param('id') id: string
	): Promise<CreatePaymentResponseDto> {
		const response = new CreatePaymentResponseDto();
		console.log(`ID time: ${id}`);
		response.success = true;
		return response;
	}
}
