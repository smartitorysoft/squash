import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocOptions, RedocModule } from 'nestjs-redoc';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import corsWrapper from './util/wrappers/cors/cors.wrapper';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './util/filters/all-exceptions.filter';
import { ValidationFilter } from './util/filters/validation.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './util/exceptions/validation.exception';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new AllExceptionsFilter(), new ValidationFilter());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const messages = errors.map((error) => {
					return {
						property: error.property,
						value: error.value,
						constraints: error.constraints,
						message: 'Property value does not satisfy constraints!'
					};
				});
				return new ValidationException(messages);
			}
		})
	);

	app.use(cookieParser());
	app.use(corsWrapper());

	const options = new DocumentBuilder()
		.setTitle('Madefalva Web App')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);

	const redocOptions: RedocOptions = {
		title: 'Madefalva',
		logo: {
			url:
				'https://smartitory.com/wp-content/uploads/2020/03/Smartitory_logo_transparent_small.png',
			backgroundColor: '#F0F0F0',
			altText: 'Smartitory logo'
		},
		sortPropsAlphabetically: true,
		hideDownloadButton: false,
		hideHostname: true,
		expandResponses: 'all',
		requiredPropsFirst: true
	};

	await RedocModule.setup('/docs', app, document, redocOptions);

	await app.listen(configService.getPort());
}
bootstrap();
