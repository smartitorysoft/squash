import ProfileDto from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiProperty({ required: false })
	email: string;
	@ApiProperty({ required: false })
	role: string;
	@ApiProperty({ required: false })
	profile: ProfileDto;
}

export default UpdateUserDto;
