import { Body, Controller, Get, Put } from '@nestjs/common';
import { OpeningsService } from './openings.service';
import { UpdateOpeningDataDto } from './dto/update-opening-data.dto';
import { OpeningDataDto } from './dto/opening-data.dto';
import { ModificationResponseDto } from '../dto/modification.response.dto';

@Controller('openings')
export class OpeningsController {
	constructor(private openingsService: OpeningsService) {}

	@Get()
	async index(): Promise<OpeningDataDto[]> {
		return await this.openingsService.findAll();
	}

	@Put()
	async update(
		@Body() dto: UpdateOpeningDataDto
	): Promise<ModificationResponseDto> {
		await this.openingsService.update(dto);
		return new ModificationResponseDto();
	}
}
