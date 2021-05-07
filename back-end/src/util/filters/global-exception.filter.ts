import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.OK;
		console.log(exception);

		response.status(status).json({
			success: false,
			...GlobalExceptionFilter.parseError(exception, status),
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}

	private static;
}
