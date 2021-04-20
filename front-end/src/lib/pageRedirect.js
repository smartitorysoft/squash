/* eslint-disable prefer-promise-reject-errors */

const pageRedirect = async ({ auth = null, url = null }, ctx) =>
	new Promise((resolve, reject) => {
		const { store, res } = ctx;

		console.log('res', res);
		// -- Redirect --//
		const redirectHandler = () => {
			if (res) {
				return res.redirect(url);
			}

			return window.scrollTo(0, 0);
		};

		// -- Check redirect type --//
		const { isSignedIn } = store.getState().auth;

		switch (auth) {
			case true:
				if (!isSignedIn) {
					if (url) {
						return redirectHandler();
					}
					return reject({ code: 'UNAUTHORIZED' });
				}
				break;
			case false:
				if (isSignedIn) {
					if (url) {
						return redirectHandler();
					}
					return reject({ code: 'AUTHORIZED' });
				}
				break;
			default:
				if (url) {
					return redirectHandler();
				}
				return resolve();
		}

		return resolve();
	});

export default pageRedirect;
