import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { ValidationException } from '../exceptions/validation.exception';
import errorCodes from '../error/error.codes.json';
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost): any {
		const response = host.switchToHttp().getResponse();

		if (configService.isProduction()) {
			return response.status(406).json({
				statusCode: 406,
				code: errorCodes['406vd00'].code,
				description: errorCodes['406vd00'].name
			});
		}

		return response.status(406).json({
			code: errorCodes['406vd00'].code,
			description: errorCodes['406vd00'].name,
			errors: this.parseErrors(exception.validationErrors)
		});
	}

	parseErrors = (errors) => {
		if (errors.length === 0) return undefined;

		const response = errors.map((error) => {
			return {
				property: error.property,
				value: error.children.length > 0 ? undefined : error.value,
				violated: error.constraints,
				children: this.parseErrors(error.children)
			};
		});

		return response;
	};
}
