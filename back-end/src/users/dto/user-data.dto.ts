import ProfileDto from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities';
export class UserDataDto {
	@ApiProperty({ required: false })
	id: string;

	@ApiProperty({ required: false })
	email: string;

	@ApiProperty({ required: false })
	role: string;

	@ApiProperty({ required: false })
	profile: ProfileDto;

	constructor(data: User) {
		if (data) {
			this.id = data.id;
			this.email = data.email;
			this.role = data.role.name;
			this.profile = data.profile;
		}
	}
}

export default UserDataDto;
