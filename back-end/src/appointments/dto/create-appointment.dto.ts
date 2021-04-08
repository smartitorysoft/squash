import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Court } from '../enum/court.enum';

class CreateAppointmentDto {
	@ApiProperty({ required: true })
	@IsDateString()
	begins: Date;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	court: Court;
}

export default CreateAppointmentDto;
