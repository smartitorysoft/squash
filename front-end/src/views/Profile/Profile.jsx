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
} from '@material-ui/core';
import ProfileModal from 'components/ProfileModal';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	div: {
		width: '45%',
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
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00C853',
			contrastText: '#fff',
		},
	},
});

const Profile = (props) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();
	const { defaultNamespace } = props;

	const { t } = useTranslation(defaultNamespace);

	const user = useSelector((state) => state.me);

	return (
		<Dashboard>
			<Box className={classes.container}>
				<Box className={classes.header}>
					<Paper className={classes.size}>
						<Avatar
							alt="Remy Sharp"
							src="/images/placeholders/profile-picture.png"
							className={classes.large}
						/>
						<Box className={classes.div}>
							<p>
								{' '}
								{t('firstName')}: {user.profile.firstName}
							</p>
							<p>
								{t('lastName')}: {user.profile.lastName}
							</p>
							<p>
								{t('phone')}: {user.profile.phone}
							</p>
							<p>
								{t('email')}: {user.email}
							</p>
							<p>Kreditek száma: {user.credit}</p>
							<p>Következő foglalás</p>
							<p>Kártyaszám</p>
							<ThemeProvider theme={theme}>
								<Button
									color="primary"
									variant="contained"
									onClick={() => setOpen(true)}
								>
									{t('edit')}
								</Button>
							</ThemeProvider>
							<ProfileModal
								defaultNamespace={defaultNamespace}
								user={user}
								open={open}
								onClose={() => setOpen(false)}
							/>
						</Box>
					</Paper>
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
