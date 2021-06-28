import React, { useRef } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	Modal,
	TextField,
	Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setProfile } from 'store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorHandling } from 'components/error';
import useTranslation from 'next-translate/useTranslation';
import { validation } from './validation';

const useStyles = makeStyles((theme) => ({
	modal: {
		width: '75%',
		height: '50%',
		backgroundColor: 'rgb(255, 255, 255)',
		marginLeft: 'calc(100% / 8)',
		marginTop: 'calc(100% / 16)',
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	boxes: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'spaceBetween',
		alignItems: 'center',
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
}));

export const ProfileModal = (props) => {
	const classes = useStyles();
	const { user, open, onClose, defaultNamespace } = props;

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const dispatch = useDispatch();

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(
				setProfile({
					id: user.id,
					details: {
						profile: {
							firstName: values.firstName,
							lastName: values.lastName,
							phone: values.phone,
						},
					},
				}),
			)
				.then(() => router.push('/dashboard'))
				.then(() => window.scrollTo(0, 0));
		} catch (error) {
			errorHandling(error);
			setSubmitting(false);
		}
	};

	return (
		<Box className={classes.container}>
			{user && (
				// <Modal className={classes.container} open={open} onClose={onClose}>
				<Formik
					validationSchema={validation}
					validateOnChange
					validateOnBlur
					validateOnMount
					onSubmit={onSubmit}
					initialValues={{
						firstName: user.profile.firstName,
						lastName: user.profile.lastName,
						email: user.email,
						phone: user.profile.phone,
					}}
				>
					{(formikProps) => {
						const {
							handleChange,
							values,
							isSubmitting,
							handleBlur,
						} = formikProps;
						return (
							<Form noValidate>
								<Box className={classes.box}>
									<TextField
										name="firstName"
										value={values.firstName}
										label={t('firstName')}
										onChange={handleChange}
										onBlur={handleBlur}
										error={!!errorChecker(formikProps, 'firstName')}
										helperText={errorChecker(formikProps, 'firstName') || ' '}
										variant="outlined"
									/>
									<TextField
										name="lastName"
										value={values.lastName}
										label={t('lastName')}
										onChange={handleChange}
										onBlur={handleBlur}
										error={!!errorChecker(formikProps, 'lastName')}
										helperText={errorChecker(formikProps, 'lastName') || ' '}
										variant="outlined"
									/>
									<TextField
										value={values.email}
										label={t('email')}
										onChange={handleChange}
										onBlur={handleBlur}
										error={!!errorChecker(formikProps, 'email')}
										helperText={errorChecker(formikProps, 'email') || ' '}
										name="email"
										variant="outlined"
									/>
									<TextField
										name="phone"
										value={values.phone}
										label={t('phone')}
										onChange={handleChange}
										onBlur={handleBlur}
										error={!!errorChecker(formikProps, 'phone')}
										helperText={errorChecker(formikProps, 'phone') || ' '}
										variant="outlined"
									/>

									<CardActions className={classes.button}>
										<Button
											color="secondary"
											variant="contained"
											onClick={onClose}
										>
											{t('cancel')}
										</Button>
										<Button
											color="primary"
											disabled={isSubmitting}
											type="submit"
											variant="contained"
											onClick={onClose}
										>
											{t('save')}
										</Button>
									</CardActions>
								</Box>
							</Form>
						);
					}}
				</Formik>
				// </Modal>
			)}
		</Box>
	);
};

export default ProfileModal;
