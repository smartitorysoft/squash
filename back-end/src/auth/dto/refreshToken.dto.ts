import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
	@ApiProperty({ required: true })
	@IsString()
	refreshToken: string;
}

export default RefreshTokenDto;
