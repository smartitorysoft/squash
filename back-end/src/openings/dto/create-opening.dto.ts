import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOpeningDto {
	@ApiProperty({ required: true })
	@IsString()
	name: string;

	@ApiProperty({ required: true })
	@IsString()
	rule: string;

	@ApiProperty({ required: true })
	@IsInt()
	order: number;

	@ApiProperty({ required: true })
	@IsInt()
	openingHour: number;

	@ApiProperty({ required: true })
	@IsInt()
	closingHour: number;
}
