import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { register } from 'store/auth/actions';
import {
	Box,
	makeStyles,
	TextField,
	Button,
	CardActions,
	Card,
	CardContent,
	Typography,
	ThemeProvider,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useErrorHandling } from 'components/error';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { validation } from './validation';

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundImage: 'url("/images/background_image.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},

	image: {
		width: '100%',
		height: '100%',
		padding: theme.spacing(16, 25, 0, 100),
		backgroundColor: 'rgba(7, 103, 30, 0.85);',
	},

	cardContent: {
		padding: theme.spacing(3, 4, 3, 4),
	},

	fields: {
		display: 'flex',
		flexWrap: 'wrap',
	},

	passwordField: {
		marginTop: theme.spacing(1),
	},
	buttons: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	buttonStyle: {
		background: '#00C853',
		borderRadius: 4,
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: '#fff',
		},
	},
});

const SignUp = (props) => {
	const { defaultNamespace } = props;

	const router = useRouter();
	const dispatch = useDispatch();

	const classes = useStyles();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(
				register({
					email: values.email,
					password: values.password,
					profile: {
						firstName: values.firstName,
						lastName: values.lastName,
						phone: values.phone,
					},
				}),
			).then(() => router.push('/sign-in'));
		} catch (error) {
			errorHandling(error);
			setSubmitting(false);
		}
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.image}>
				<Formik
					onSubmit={onSubmit}
					validationSchema={validation}
					validateOnChange
					validateOnBlur
					validateOnMount
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						phone: '',
						password: '',
						passwordCheck: '',
					}}
				>
					{(formikProps) => {
						const {
							isSubmitting,
							values,
							handleChange,
							handleBlur,
						} = formikProps;
						return (
							<Form noValidate>
								<Card>
									<CardContent className={classes.cardContent}>
										<Box className={classes.fields}>
											<Typography className={classes.label}>
												{t('sign-up')}
											</Typography>
											<TextField
												fullWidth
												name="firstName"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'firstName')}
												helperText={
													errorChecker(formikProps, 'firstName') || ' '
												}
												value={values.firstName}
												label={t('firstName')}
												variant="outlined"
											/>
											<TextField
												fullWidth
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'lastName')}
												helperText={
													errorChecker(formikProps, 'lastName') || ' '
												}
												value={values.lastName}
												label={t('lastName')}
												variant="outlined"
											/>
											<TextField
												fullWidth
												name="email"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'email')}
												helperText={errorChecker(formikProps, 'email') || ' '}
												value={values.email}
												label={t('username')}
												variant="outlined"
											/>
											<TextField
												fullWidth
												name="phone"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'phone')}
												helperText={errorChecker(formikProps, 'phone') || ' '}
												value={values.phone}
												label={t('phone')}
												variant="outlined"
											/>
											<TextField
												fullWidth
												name="password"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'password')}
												helperText={
													errorChecker(formikProps, 'password') || ' '
												}
												value={values.password}
												label={t('password')}
												type="password"
												variant="outlined"
											/>
											<TextField
												fullWidth
												name="passwordCheck"
												onChange={handleChange}
												onBlur={handleBlur}
												error={!!errorChecker(formikProps, 'passwordCheck')}
												helperText={
													errorChecker(formikProps, 'passwordCheck') || ' '
												}
												value={values.passwordCheck}
												label={t('passwordCheck')}
												type="password"
												variant="outlined"
											/>
										</Box>
									</CardContent>
									<CardActions className={classes.buttons}>
										<ThemeProvider theme={theme}>
											<Button
												fullWidth
												className={classes.buttonStyle}
												color="primary"
												disabled={isSubmitting}
												type="submit"
												variant="contained"
											>
												{t('sign-up')}
											</Button>
										</ThemeProvider>
										<Button
											fullWidth
											color="#00C853"
											disabled={isSubmitting}
											variant="contained"
											onClick={() => router.back()}
										>
											{t('back')}
										</Button>
									</CardActions>
								</Card>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Box>
	);
};

export default SignUp;
