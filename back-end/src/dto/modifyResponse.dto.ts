import { ApiProperty } from '@nestjs/swagger';

export class ModifyResponseDto {
	@ApiProperty({ required: false })
	success: boolean;

	constructor(success: boolean) {
		this.success = success;
	}
}
