import React, { useRef } from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setProfile } from 'store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from '../TextInput/TextInput';
import { BasicButton } from '../BasicButton/BasicButton';

const useStyles = makeStyles(() => ({
	modal: {
		width: '75%',
		height: '50%',
		backgroundColor: 'rgb(255, 255, 255)',
		marginLeft: 'calc(100% / 8)',
		marginTop: 'calc(100% / 8)',
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
}));

export const ProfileModal = ({ open, onClose }) => {
	const classes = useStyles();

	const formRef = useRef();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.me.info);

	const onSubmit = () => {
		if (formRef && formRef.current.isValid) {
			dispatch(
				setProfile({
					id: user.id,
					details: {
						profile: {
							firstName: formRef.current.values.firstName,
							lastName: formRef.current.values.lastName,
							phone: `+40${formRef.current.values.phone}`,
						},
					},
				}),
			);
		}
	};

	const ProfileSchema = Yup.object().shape({
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		email: Yup.string().email().required('Required'),
		phone: Yup.number().required('Required'),
	});

	return (
		<div>
			<Modal open={open} onClose={onClose}>
				<Formik
					innerRef={formRef}
					validationSchema={ProfileSchema}
					validateOnChange
					validateOnBlur
					validateOnMount
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						phone: '',
					}}
				>
					{({
						handleChange,
						// handleSubmit,
						values,
						// errors,
						// setFieldValue,
						// touched,
						// setTouched,
					}) => (
						<div className={classes.modal}>
							<TextInput
								value={values.firstName}
								label="Vezetéknév"
								onChange={handleChange('firstName')}
							/>
							<TextInput
								value={values.lastName}
								label="Keresztnév"
								onChange={handleChange('lastName')}
							/>
							<TextInput
								value={values.email}
								label="Email cím"
								onChange={handleChange('email')}
							/>
							<TextInput
								value={values.phone}
								label="Telefonszám"
								onChange={handleChange('phone')}
							/>
						</div>
					)}
				</Formik>
				<BasicButton label="Változtat" onClick={onSubmit} />
			</Modal>
		</div>
	);
};

export default ProfileModal;
