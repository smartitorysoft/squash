import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteOpeningDto {
	@ApiProperty({ required: true })
	@IsUUID()
	id: string;
}
