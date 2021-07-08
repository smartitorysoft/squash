import React from 'react';
import { Button, makeStyles, Box, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		marginTop: 25,
	},
	text: {
		fontSize: 20,
		color: '#07671E',
		fontWeights: '700',
		padding: 5,
	},
	large: {
		width: theme.spacing(25),
		height: theme.spacing(25),
		padding: 25,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	centering: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerText: {
		fontSize: 16,
		color: '#07671E',
		padding: 5,
	},
}));
const ProfileDetails = (props) => {
	const { open, onClick, defaultNamespace, user } = props;

	const { t } = useTranslation(defaultNamespace);

	const classes = useStyles();
	return (
		<Box className={classes.container}>
			<Typography className={classes.text}>
				{t('firstName').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}>
				{' '}
				{user.profile.firstName}
			</Typography>
			<Typography className={classes.text}>
				{t('lastName').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}>
				{user.profile.lastName}
			</Typography>
			<Typography className={classes.text}>
				{t('phone').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}>
				{user.profile.phone}
			</Typography>
			<Typography className={classes.text}>
				{t('email').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}>{user.email}</Typography>
			<Typography className={classes.text}>
				{t('creditNumber').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}>{user.credit}</Typography>
			<Typography className={classes.text}>
				{t('nextAppointment').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}> 3000.01.01</Typography>
			<Typography className={classes.text}>
				{t('cardNumber').toUpperCase()}
			</Typography>
			<Typography className={classes.innerText}> 123456789</Typography>

			<Button color="primary" variant="contained" onClick={onClick}>
				{t('edit')}
			</Button>
		</Box>
	);
};

export default ProfileDetails;
