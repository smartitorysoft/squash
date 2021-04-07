import ProfileDto from './profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
	@ApiProperty({ required: false })
	@IsEmail()
	email: string;

	@ApiProperty({ required: false })
	@ValidateNested({ each: true })
	@Type(() => ProfileDto)
	profile: ProfileDto;
}

export default UpdateUserDto;
