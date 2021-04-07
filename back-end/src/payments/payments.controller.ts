import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
	UseGuards
} from '@nestjs/common';
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
	@Target('admin')
	@Operation('create')
	async create(
		@Body() dto: CreatePaymentDto,
		@Param('id', new ParseUUIDPipe()) id: string
	): Promise<CreatePaymentResponseDto> {
		const response = new CreatePaymentResponseDto();
		response.id = await this.paymentsService.addCredit(id, dto.value);
		return response;
	}
}
