import { ApiProperty } from '@nestjs/swagger';
import { UpdateOpeningDto } from './update-opening.dto';
import { CreateOpeningDto } from './create-opening.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DeleteOpeningDto } from './delete-opening.dto';

export class UpdateOpeningDataDto {
	@ApiProperty({ required: false, isArray: true, type: CreateOpeningDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOpeningDto)
	create: CreateOpeningDto[];

	@ApiProperty({ required: false, isArray: true, type: UpdateOpeningDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateOpeningDto)
	update: UpdateOpeningDto[];

	@ApiProperty({ required: false, isArray: true, type: DeleteOpeningDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => DeleteOpeningDto)
	delete: DeleteOpeningDto[];
}
