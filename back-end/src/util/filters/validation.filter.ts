import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost): any {
		const response = host.switchToHttp().getResponse();

		if (configService.isProduction()) {
			return response.status(406).json({
				statusCode: 406,
				createdBy: 'ValidationFilter',
				error: 'Validation Error!'
			});
		}

		return response.status(406).json({
			statusCode: 406,
			createdBy: 'ValidationFilter',
			errors: exception.validationErrors
		});
	}

	parseErrors = (errors) => {
		const response = errors.map((error) => {
			return error;
		});
	};
}
