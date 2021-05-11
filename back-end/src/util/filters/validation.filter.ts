import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { ValidationException } from '../exceptions/validation.exception';
import errorCodes from '../error/error.codes.json';
import { parseValidationErrors } from '../helpers/parse.validation';
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost): any {
		const response = host.switchToHttp().getResponse();

		return response.status(406).json({
			error: {
				code: errorCodes['406vd00'].code,
				description: errorCodes['406vd00'].name,
				inputs: parseValidationErrors(exception.validationErrors),
			},
		});
	}
}
