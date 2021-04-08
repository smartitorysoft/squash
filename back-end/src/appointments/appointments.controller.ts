import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import CreateAppointmentDto from './dto/create-appointment.dto';
import CreateAppointmentResponseDto from './dto/create-appointment.response.dto';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';

@Controller('appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	@Post()
	@UseGuards(JwtAuthenticationGuard)
	async create(
		@Req() req: RequestWithUser,
		@Body() dto: CreateAppointmentDto
	): Promise<CreateAppointmentResponseDto> {
		const response = new CreateAppointmentResponseDto();
		response.id = await this.appointmentsService.create(dto, req.user);
		return response;
	}
}
