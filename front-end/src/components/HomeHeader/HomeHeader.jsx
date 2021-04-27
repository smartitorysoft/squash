import React, { useState, useEffect } from 'react';
import {
	AppBar, Tabs, Tab, IconButton,
	makeStyles, Box,
} from '@material-ui/core';
import { ProfileHeader } from 'components/ProfileHeader/ProfileHeader';
import TabPanel from 'components/TabPanel/TabPanel';
import ProfileModal from 'components/ProfileModal/ProfileModal';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { GridComponent } from 'components/Grid/GridComponent';

import { useRouter } from 'next/router';
import { BasicButton } from 'components/BasicButton/BasicButton';
// import { getUserAppointments } from "store/appointments/actions";
// import { AppointmentsTable } from "../AppointmentsTable/AppointmentsTable";

const useStyles = makeStyles((theme) => ({
	container: {
		marginLeft: 'calc(100% / 8)',
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
	home: {
		height: '100%',
		width: '100%',
	},
}));

export const HomeHeader = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState(0);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	// dispatch(getUserAppointments());

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const classes = useStyles();

	const user = useSelector((state) => state.me.info);

	return (
		<div className={classes.home}>
			<AppBar style={{ alignItems: 'flex-end' }} position='sticky'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='simple tabs example'
				>
					<Tab label='Home' />
					<Tab label='Foglalás' />
					<Tab label='Profil' />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<div className={classes.container}>
					<GridComponent />
				</div>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<IconButton onClick={() => router.push('/credit')}>
					<EditIcon />
				</IconButton>
				{/* <AppointmentsTable /> */}
			</TabPanel>
			<TabPanel value={value} index={2}>
				<BasicButton label='Profile' onClick={() => router.push('/profile')} />
				{/* <div className={classes.header}>
          <div className={classes.div}>
            <p> Vezetéknév Keresztnév</p>
            <p>Telefonszám</p>
            <p>Email</p>
          </div>
          <div className={classes.div}>
            <p>Kreditek száma</p>
            <p>Következő foglalás</p>
            <p>Kártyaszám</p>
          </div>

          <div className={classes.div}>
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>

            <ProfileModal open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
        <Box className={classes.size}>
          <ProfileHeader />
        </Box> */}
			</TabPanel>
		</div>
	);
};
