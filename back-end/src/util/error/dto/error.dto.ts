import errorCodes from '../error.codes.json';

export class ErrorDto {
		code: errorCodes['406vd00'].code,
		description: errorCodes['406vd00'].name,
		inputs: parseValidationErrors(exception.validationErrors),


	constructor(
		property: string,
		value: any | undefined,
		violated: Record<string, string>,
		children: ValidationErrorDto[] | undefined,
	) {
		this.property = property;
		this.value = value;
		this.violated = violated;
		this.children = children;
	}
}
