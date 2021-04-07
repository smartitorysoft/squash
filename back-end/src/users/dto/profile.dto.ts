import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class ProfileDto {
	@ApiProperty({ required: false })
	@IsString()
	firstName: string;

	@ApiProperty({ required: false })
	@IsString()
	lastName: string;

	@ApiProperty({ required: true })
	@IsPhoneNumber()
	phone: string;
}

export default ProfileDto;
