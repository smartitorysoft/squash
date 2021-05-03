import React from 'react';
import {
	Box, Button, makeStyles, TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import BasicButton from 'components/BasicButton';
import { useDispatch } from 'react-redux';
import { getMe } from 'store/me/actions';
import { signIn, signOut } from 'store/auth/actions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useErrorHandling } from 'components/error';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 'calc(50vh - 100px)',
	},

	field: {
		marginTop: theme.spacing(2),
		width: 300,
	},

	buttons: {
		display: 'flex',
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: '500',
	},
}));

const SignIn = () => {
	const router = useRouter();
	const classes = useStyles();
	const dispatch = useDispatch();

	const { errorHandling, errorChecker } = useErrorHandling(useTranslation('error'));

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(signIn(values));
			try {
				await dispatch(getMe());
			} catch (error) {
				console.log('Lefut a hibakezeles');
				await dispatch(signOut());
				errorHandling(error);
			}

			router.push('/dashboard').then(() => window.scrollTo(0, 0));
		} catch (error) {
			errorHandling(error);
		}

		setSubmitting(false);
	};

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email().required('Required'),
		password: Yup.string(),
	});

	return (
		<Box className={classes.root}>
			<Formik
				validationSchema={LoginSchema}
				onSubmit={onSubmit}
				initialValues={{
					email: '',
					password: '',
				}}
			>
				{(formikProps) => {
					const {
						isSubmitting, values, handleChange, handleBlur,
					} = formikProps;
					return (
						<Form className={classes.container}>
							<TextField
								fullWidth
								label='Email cím'
								name='email'
								className={classes.field}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								error={!!errorChecker(formikProps, 'email')}
								helperText={errorChecker(formikProps, 'email')}
							/>
							<TextField
								fullWidth
								label='Jelszó'
								name='password'
								className={classes.field}
								type='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								error={!!errorChecker(formikProps, 'password')}
								helperText={errorChecker(formikProps, 'password')}
							/>

							<Box className={classes.buttons}>
								<Button
									color='primary'
									disabled={isSubmitting}
									size='large'
									type='submit'
									variant='contained'
								>
									Belépés
								</Button>
								<BasicButton
									onClick={() => {
										router.push('/register');
									}}
									label='Regisztráció'
								/>
							</Box>
						</Form>
					);
				}}
			</Formik>
		</Box>
	);
};

export default SignIn;
