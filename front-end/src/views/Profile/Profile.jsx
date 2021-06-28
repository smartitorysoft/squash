import { ProfileHeader } from 'components/ProfileHeader/ProfileHeader';

import React, { useState } from 'react';
import {
	Button,
	makeStyles,
	Box,
	createMuiTheme,
	Paper,
	Avatar,
	ThemeProvider,
	Typography,
} from '@material-ui/core';
import ProfileModal from 'components/ProfileModal';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(2),
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	size: {
		height: '95%',
		width: '65%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	large: {
		width: theme.spacing(25),
		height: theme.spacing(25),
		padding: 25,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	fullSize: {
		height: '100%',
		width: '100%',
	},
	centering: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	avatarBox: {
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		flexDirection: 'column',
		marginTop: 25,
	},

	text: {
		fontSize: 20,
		color: '#07671E',
		fontWeights: '700',
	},
	innerText: {
		fontSize: 16,
		color: '#07671E',
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00C853',
			contrastText: '#fff',
		},
		secondary: {
			main: '#07671E',
			contrastText: '#fff',
		},
	},
});

const Profile = (props) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();
	const { defaultNamespace } = props;

	const { t } = useTranslation(defaultNamespace);

	// const user = useSelector((state) => state.me);

	const user = {
		profile: {
			firstName: 'Lorem',
			lastName: 'Ipsum',
			phone: '+40755279691',
		},
		email: 'vgtamas@example.com',
		credit: '500055',
	};

	return (
		<Dashboard>
			<Box className={classes.container}>
				<Box className={classes.header}>
					<ThemeProvider theme={theme}>
						<Paper className={classes.size}>
							<Box className={classes.avatarBox}>
								<Typography
									color="secondary"
									className={[classes.centerJustify, classes.text]}
								>
									{t('profile').toUpperCase()}
								</Typography>
								<Avatar
									alt="Remy Sharp"
									src="/images/placeholders/profile-picture.png"
									className={classes.large}
								/>
							</Box>
							<Box className={[classes.centering, classes.fullSize]}>
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
								<Typography className={classes.innerText}>
									{user.email}
								</Typography>
								<Typography className={classes.text}>
									{t('creditNumber').toUpperCase()}
								</Typography>
								<Typography className={classes.innerText}>
									{user.credit}
								</Typography>
								<Typography className={classes.text}>
									{t('nextAppointment').toUpperCase()}
								</Typography>
								<Typography className={classes.text}>
									{t('cardNumber').toUpperCase()}
								</Typography>

								<Button
									color="primary"
									variant="contained"
									onClick={() => setOpen(true)}
								>
									{t('edit')}
								</Button>

								<ProfileModal
									defaultNamespace={defaultNamespace}
									user={user}
									open={open}
									onClose={() => setOpen(false)}
								/>
							</Box>
						</Paper>
					</ThemeProvider>
				</Box>
				{/* <Box className={classes.size}>
					<ProfileHeader />
				</Box> */}
			</Box>
		</Dashboard>
	);
};

Profile.propTypes = {};

export default Profile;
