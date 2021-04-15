import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Query,
	Req,
	UseGuards
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import CreateAppointmentDto from './dto/create-appointment.dto';
import CreateAppointmentResponseDto from './dto/create-appointment.response.dto';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AppointmentDataDto } from './dto/appointment-data.dto';
import { configService } from '../config/config.service';
import DeleteAppointmentResponseDto from './dto/delete-appointment.response.dto';
import AppointmentTableDataResponseDto from './dto/appointment-table-data.response.dto';
import { Status } from './enum/status.enum';
import BaseException from '../util/exceptions/base.exception';

@Controller('appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	private static validateFilters(filters: string): string[] {
		if (filters) {
			const tmp = filters.split(',');
			tmp.forEach((item) => {
				if (!Status[item]) {
					throw new BaseException('400apo01');
				}
			});
			return tmp;
		}
		return [];
	}

	@Get()
	async index(
		@Query('from') from = AppointmentsService.getDayByDate(new Date()),
		@Query('days') days = 1,
		@Query('status') filters: string = null
	): Promise<AppointmentTableDataResponseDto> {
		days = Math.max(days, 1);
		from = new Date(from);
		return new AppointmentTableDataResponseDto(
			await this.appointmentsService.findAll(
				from,
				days,
				false,
				AppointmentsController.validateFilters(filters)
			)
		);
	}

	@Get('/admin')
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('appointments')
	@Operation('read')
	async indexAdmin(
		@Query('from') from = AppointmentsService.getDayByDate(new Date()),
		@Query('days') days = 1,
		@Query('status') filters: string = null
	): Promise<AppointmentTableDataResponseDto> {
		days = Math.max(days, 1);
		from = new Date(from);
		return new AppointmentTableDataResponseDto(
			await this.appointmentsService.findAll(
				from,
				days,
				true,
				AppointmentsController.validateFilters(filters)
			)
		);
	}

	@Get('/mine')
	@UseGuards(JwtAuthenticationGuard)
	async getMine(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Req() req: RequestWithUser,
		@Query('status') filters: string = null
	): Promise<Pagination<AppointmentDataDto>> {
		limit = Math.min(limit, 20);
		return this.appointmentsService.findByUser(
			{
				page,
				limit,
				route: configService.getApiUrl('appointments/mine')
			},
			req.user,
			AppointmentsController.validateFilters(filters)
		);
	}

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

	@Delete(':id')
	@UseGuards(JwtAuthenticationGuard)
	async delete(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Req() req: RequestWithUser
	): Promise<DeleteAppointmentResponseDto> {
		await this.appointmentsService.delete(id, req.user);
		return new DeleteAppointmentResponseDto();
	}

	@Delete(':/id/admin')
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('appointments')
	@Operation('delete')
	async deleteAdmin(
		@Param('id', new ParseUUIDPipe()) id: string
	): Promise<DeleteAppointmentResponseDto> {
		await this.appointmentsService.deleteAdmin(id);
		return new DeleteAppointmentResponseDto();
	}
}
