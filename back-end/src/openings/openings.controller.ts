import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { OpeningsService } from './openings.service';
import { UpdateOpeningDataDto } from './dto/update-opening-data.dto';
import { OpeningDataDto } from './dto/opening-data.dto';
import { ModificationResponseDto } from '../dto/modification.response.dto';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';

@Controller('openings')
export class OpeningsController {
	constructor(private openingsService: OpeningsService) {}

	@Get()
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('admin')
	@Operation('read')
	async index(): Promise<OpeningDataDto[]> {
		return await this.openingsService.findAll();
	}

	@Put()
	@UseGuards(JwtAuthenticationGuard, PermissionGuard)
	@Target('admin')
	@Operation('update')
	async update(
		@Body() dto: UpdateOpeningDataDto
	): Promise<ModificationResponseDto> {
		await this.openingsService.update(dto);
		return new ModificationResponseDto();
	}
}
