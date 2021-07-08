import React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	TextField,
	Typography,
	Link,
	ThemeProvider,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/auth/actions';
import { Form, Formik } from 'formik';
import { useErrorHandling } from 'components/error';
import useTranslation from 'next-translate/useTranslation';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { validation } from './validation';

const useStyles = makeStyles((theme) => ({
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
	label: {
		paddingBottom: 40,
		fontSize: 25,
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

const SignIn = (props) => {
	const { defaultNamespace } = props;

	const router = useRouter();
	const classes = useStyles();
	const dispatch = useDispatch();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(signIn(values))
				.then(() => router.push('/dashboard'))
				.then(() => window.scrollTo(0, 0));
		} catch (error) {
			errorHandling(error);
			setSubmitting(false);
		}
	};

	return (
		<div className={classes.root}>
			<div className={classes.image}>
				<Formik
					validationSchema={validation}
					onSubmit={onSubmit}
					initialValues={{
						email: '',
						password: '',
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
								<Card style={{ hegiht: '100%' }}>
									<CardContent className={classes.cardContent}>
										<div className={classes.fields}>
											<Typography className={classes.label}>
												{t('sign-in')}
											</Typography>
											<TextField
												fullWidth
												label={t('username')}
												name="email"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.email}
												error={!!errorChecker(formikProps, 'email')}
												helperText={errorChecker(formikProps, 'email') || ' '}
												variant="outlined"
											/>
											<TextField
												fullWidth
												label={t('password')}
												name="password"
												className={classes.passwordField}
												type="password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
												error={!!errorChecker(formikProps, 'password')}
												helperText={
													errorChecker(formikProps, 'password') || ' '
												}
												variant="outlined"
											/>
										</div>
									</CardContent>
									<CardActions className={classes.buttons}>
										<ThemeProvider theme={theme}>
											<Button
												disabled={isSubmitting}
												color="primary"
												type="submit"
												variant="contained"
												fullWidth
											>
												{t('sign-in')}
											</Button>
										</ThemeProvider>
										<Typography style={{ paddingTop: 10 }}>
											{t('new-user')}{' '}
											<Link
												onClick={() => {
													router.push('/sign-up');
												}}
											>
												{t('sign-up')}
											</Link>
										</Typography>
									</CardActions>
								</Card>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default SignIn;
