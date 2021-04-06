import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

class CreatePaymentDto {
	@ApiProperty({ required: true })
	@IsInt()
	value: number;
}

export default CreatePaymentDto;
