import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../entities';
import { AppointmentDataDto } from './appointment-data.dto';
import UserDataDto from '../../users/dto/user-data.dto';

export class AppointmentDataAdminDto extends AppointmentDataDto {
	@ApiProperty({ required: true })
	user: UserDataDto;

	constructor(data: Appointment) {
		if (data) {
			super(data);
			this.user = new UserDataDto(data.user);
		}
	}
}
