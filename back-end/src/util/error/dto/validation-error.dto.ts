export class ValidationErrorDto {
	code: string;

	message: string;

	constructor(data: Appointment) {
		if (data) {
			this.id = data.id;
			this.begins = data.begins;
			this.court = data.court;
		}
	}
}
