import { ProfileHeader } from 'components/ProfileHeader/ProfileHeader';

import React, { useState, useEffect } from 'react';
import { IconButton, makeStyles, Box } from '@material-ui/core';
import ProfileModal from 'components/ProfileModal/ProfileModal';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		marginLeft: 200,
		padding: theme.spacing(2),
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
	},
	div: {
		width: '45%',
	},
	size: {
		height: '75%',
		width: '95%',
	},
}));

const Profile = (props) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	return (
		<>
			<Box className={classes.home}>
				<Box className={classes.header}>
					<Box className={classes.div}>
						<p> Vezetéknév Keresztnév</p>
						<p>Telefonszám</p>
						<p>Email</p>
					</Box>

					<Box className={classes.div}>
						<p>Kreditek száma</p>
						<p>Következő foglalás</p>
						<p>Kártyaszám</p>
					</Box>

					<Box className={classes.div}>
						<IconButton onClick={() => setOpen(true)}>
							<EditIcon />
						</IconButton>
						<ProfileModal open={open} onClose={() => setOpen(false)} />
					</Box>
				</Box>
				<Box className={classes.size}>
					<ProfileHeader />
				</Box>
			</Box>
		</>
	);
};

Profile.propTypes = {};

export default Profile;
