import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
	ThemeProvider,
	makeStyles,
	Link,
	Typography,
	Box,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import ReserveModal from '../ReserveModal';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		border: 'rgb(125, 120, 120)',
		borderWidth: 1,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	segment: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	verticalLine: {
		height: '100%',
		width: 1,
		backgroundColor: 'grey',
	},

	full: {
		display: 'flex',
		flexDirection: 'row',
		border: 'rgb(125, 120, 120)',
		borderWidth: 1,
		borderRadius: 5,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(253, 61, 61)',
	},

	half: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(253, 61, 61)',
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: '#fff',
		},
		secondary: {
			main: red[500],
			contrastText: '#000',
		},
	},
});

export const Card = (props) => {
	const { date, hour, court } = props;

	const [open, setOpen] = useState(false);

	const classes = useStyles();

	date.setHours(hour);
	date.setMinutes(0);
	const reserveDate = new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
		),
	).toISOString();

	return (
		<Box className={classes.container}>
			<ThemeProvider theme={theme}>
				<Link onClick={() => setOpen(true)}>
					{hour < 10 ? '0'.concat(hour, ':00') : ''.concat(hour, ':00')}
				</Link>
				<ReserveModal
					open={open}
					onClose={() => setOpen(false)}
					date={reserveDate}
					hour={hour}
					court={court}
				/>
			</ThemeProvider>
		</Box>
	);
};

export default Card;
