import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import TextInput from 'components/TextInput';
import BasicButton from 'components/BasicButton';
import { register } from 'store/auth/actions';
import { Box, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
	container: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttons: {
		width: 300,
		paddingTop: '10',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'spaceBetween',
	},
});

const Register = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const formRef = useRef();

	const classes = useStyles();

	const RegistrationSchema = Yup.object().shape({
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		email: Yup.string().email().required('Required'),
		phone: Yup.number().required('Required'),
		password: Yup.string()
			.required('Required'),
		passwordCheck: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords don\'t match!')
			.required('Required'),
	});

	const onSubmit = () => {
		console.log(formRef);
		if (formRef && formRef.current.isValid) {
			dispatch(register({
				email: formRef.current.values.email,
				password: formRef.current.values.password,
				role: 'root',
				profile: {
					firstName: formRef.current.values.firstName,
					lastName: formRef.current.values.lastName,
					phone: formRef.current.values.phone,
				},
			}));
		}
	};

	return (
		<Box className={classes.container}>
			<Formik
				innerRef={formRef}
				validationSchema={RegistrationSchema}
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
				{({
					handleChange,
					handleBlur,
					// handleSubmit,
					values,
					// errors,
					// setFieldValue,
					// touched,
					// setTouched,
				}) => (
					<Box>
						<TextInput
							value={values.firstName}
							label='Vezetéknév'
							onChange={handleChange('firstName')}
						/>
						<TextInput
							value={values.lastName}
							label='Keresztnév'
							onChange={handleChange('lastName')}
						/>
						<TextInput
							value={values.email}
							label='Email cím'
							onChange={handleChange('email')}
						/>
						<TextInput
							value={values.phone}
							label='Telefonszám'
							onChange={handleChange('phone')}

						/>
						<TextInput
							value={values.password}
							label='Jelszó'
							type='password'
							onChange={handleChange('password')}
						/>
						<TextInput
							value={values.passwordCheck}
							label='Jelszó megerősítése'
							type='password'
							onChange={handleChange('passwordCheck')}
						/>
					</Box>
				)}
			</Formik>
			<Box className={classes.buttons}>
				<BasicButton label='Regisztrálás' onClick={onSubmit} />
				<BasicButton label='Vissza' onClick={() => router.back()} />
			</Box>
		</Box>
	);
};

export default Register;
