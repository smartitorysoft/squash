import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost): any {
		const response = host.switchToHttp().getResponse();
		console.log(exception);
		return response.status(406).json({
			statusCode: 406,
			createdBy: 'ValidationFilter',
			errors: exception.validationErrors
		});
	}
}
