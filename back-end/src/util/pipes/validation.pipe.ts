import { ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

export const ValidationPipe = new NestValidationPipe({
	transform: true,
	whitelist: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
	validationError: {
		target: true,
		value: true
	},
	exceptionFactory: (errors: ValidationError[]) => {
		return new ValidationException(errors);
	}
});
