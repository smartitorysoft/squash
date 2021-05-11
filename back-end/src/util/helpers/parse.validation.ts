import { ValidationError } from 'class-validator';
import { ValidationErrorDto } from '../error/dto/validation-error.dto';

export const parseValidationErrors = (
	errors: ValidationError[] | undefined | null,
): any => {
	if (!Array.isArray(errors) || !errors.length) return undefined;

	const data = errors.map((error) => {
		return new ValidationErrorDto(
			error.property,
			!Array.isArray(error.children) ? error.value : undefined,
			error.constraints,
			Array.isArray(error.children)
				? parseValidationErrors(error.children)
				: undefined,
		);
	});

	return data;
};
