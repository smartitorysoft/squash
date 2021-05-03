/* eslint-disable no-fallthrough */
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { setError } from 'store/error/actions';
import { useSnackbar } from 'components/Snackbar';
import { useRouter } from 'next/router';

const useErrorHandling = ({ t }) => {
	const dispatch = useDispatch();
	const { snackbarError } = useSnackbar();
	const router = useRouter();

	const inputError = (error) => snackbarError(t(`${error[0].input}_${error[0].error}`));

	const errorChecker = ({ errors, touched, submitCount }, field) => {
		let error = false;

		if (submitCount === 0) {
			if (get(errors, field) && get(touched, field)) {
				error = get(errors, field);
			}
		} else {
			error = get(errors, field) || false;
		}

		return error ? t(error) : false;
	};

	const errorHandling = async (error) => {
		switch (error.code) {
			case '200su01':
			case '200su11':

			// -- Jwt token expired  --//
			case '200aa06':
				return router.push('/sign-out');

			// -- Input error --//
			case '200ab01':
			case '200ac01':
			case '200ad00':
				if (error.inputs && error.inputs[0].input === 'email') {
					return snackbarError(t('email_exists'));
				}
				return snackbarError(t(error.code));
			case '200re00':
			case '200us00':
			case '200wo00':
			case '200pr00':
				return inputError(error.inputs);

			// -- Page errors --//
			case 'INTERNAL_SERVER_ERROR':
			case 'UNAUTHORIZED':
			case 'NETWORK_ERROR':
				return  dispatch(setError(error.code));

			default:
				return snackbarError(t(error.code));
		}
	};

	return {
		errorChecker,
		errorHandling,
	};
};

export default useErrorHandling;
