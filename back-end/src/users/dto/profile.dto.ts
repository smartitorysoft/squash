import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class ProfileDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	firstName: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	lastName: string;

	@ApiProperty({ required: false, description: 'Date string in ISO format' })
	@IsOptional()
	@IsDateString()
	dateOfBirth: Date;
}

export default ProfileDto;
