import { ApiProperty } from '@nestjs/swagger';
import { Court } from '../enum/court.enum';
import { Appointment } from '../../entities';

export class AppointmentDataDto {
	@ApiProperty({ required: true })
	id: string;

	@ApiProperty({ required: true })
	createdAt: Date;

	@ApiProperty({ required: true })
	begins: Date;

	@ApiProperty({ required: true })
	court: Court;

	constructor(data: Appointment) {
		if (data) {
			this.id = data.id;
			this.createdAt = data.createdAt;
			this.begins = data.begins;
			this.court = data.court;
		}
	}
}
