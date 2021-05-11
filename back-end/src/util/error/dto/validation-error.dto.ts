export class ValidationErrorDto {
	property: string;
	value?: any | undefined;
	violated: Record<string, string>;
	children?: ValidationErrorDto[] | undefined;

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
