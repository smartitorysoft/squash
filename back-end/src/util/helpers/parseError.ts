import * as customErrors from '../error/error.codes.json';

export const parseError = (
	error: { code: string | number } | any,
	status: number,
) => {
	// console.log(error);
	if (error?.code && customErrors[error.code]) {
		return {
			status: status,
			error: {
				...customErrors[error.code],
			},
		};
	} else if (error?.name && customErrors[error.name]) {
		return {
			status: status,
			error: {
				...customErrors[error.name],
				message: error.message
					? error.message
					: `Error code not recodnized: ${error.code}`,
			},
		};
	} else {
		return {
			status: status,
			error: {
				name: error.name ? error.name : `Unknown error`,
				message: error.message
					? error.message
					: `Error code not recodnized: ${error.code}`,
			},
		};
	}
};
