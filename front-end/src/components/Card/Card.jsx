import React, { useState, useEffect } from 'react';
import { ThemeProvider, makeStyles, Button, Box } from '@material-ui/core';
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
			main: '#FB2222',
			contrastText: '#000',
		},
	},
});

export const Card = (props) => {
	const { disabled, date, hour, court } = props;
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

	const time = hour < 10 ? '0'.concat(hour, ':00') : ''.concat(hour, ':00');

	return (
		<Box className={classes.container}>
			<ThemeProvider theme={theme}>
				<Box>
					{disabled ? (
						<Button size="small" color="secondary" disabled>
							{time}
						</Button>
					) : (
						<Button size="small" color="primary" onClick={() => setOpen(true)}>
							{time}
						</Button>
					)}
					<ReserveModal
						open={open}
						onClose={() => setOpen(false)}
						date={reserveDate}
						hour={hour}
						court={court}
					/>
				</Box>
			</ThemeProvider>
		</Box>
	);
};
export default Card;
