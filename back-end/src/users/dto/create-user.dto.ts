import ProfileDto from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateUserDto {
	@ApiProperty({ required: false })
	@IsEmail()
	email: string;

	@ApiProperty({ required: false })
	@IsString()
	password: string;

	@ApiProperty({ required: false })
	@IsString()
	role: string;

	@ApiProperty({ required: false })
	@ValidateNested()
	@Type(() => ProfileDto)
	@IsOptional()
	profile: ProfileDto;

	constructor(
		data:
			| {
					email: string;
					password: string;
					role: string;
					profile: ProfileDto | any;
			  }
			| any
	) {
		if (data) {
			this.email = data.email;
			this.password = data.password;
			this.role = data.role;
			this.profile = new ProfileDto();
		}
	}
}

export default CreateUserDto;
