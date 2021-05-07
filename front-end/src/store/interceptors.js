export const interceptors = (instance) => {
	// response interceptor
	instance.interceptors.response.use(
		(res) => {
			console.log(res.data);
			if (!res.data.success) {
				return Promise.reject(res.data.error);
			}

			return res.data.response;
		},
		(error) => {
			let errorCode = 'UNKNOWN_ERROR';

			if (error) {
				if (error.response) {
					if (error.response.status) {
						if (error.response.status === 400) {
							errorCode = 'BAD_REQUEST';
						}

						if (error.response.status === 401) {
							errorCode = 'UNAUTHORIZED';
						}

						if (error.response.status === 403) {
							errorCode = 'FORBIDDEN';
						}

						if (error.response.status === 404) {
							errorCode = 'PAGE_NOT_FOUND';
						}

						if (error.response.status >= 500) {
							errorCode = 'INTERNAL_SERVER_ERROR';
						}
					}
				} else {
					errorCode = 'NETWORK_ERROR';
				}
			}

			const errorResponse = {
				code: errorCode,
			};

			return Promise.reject(errorResponse);
		},
	);

	return instance;
};
