import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Modal,
	Typography,
	createMuiTheme,
	ThemeProvider,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as moment from 'moment';
import { red, green } from '@material-ui/core/colors';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { makeAppointment } from '../../store/appointments/actions';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		width: '50%',
		height: '50%',
		backgroundColor: 'white',
		marginLeft: 'calc(100% / 4)',
		marginTop: 'calc(100% / 8)',
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	textHolder: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 40,
		fontWeight: 'bold',
	},
	lowerText: {
		fontSize: 24,
	},
	closeButton: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '100%',
		marginRight: 20,
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: '#fff',
		},
		secondary: {
			main: '#07671E',
			contrastText: '#fff',
		},
		error: {
			main: '#FB2222',
			contrastText: '#000',
		},
	},
});

const ReserveModal = ({ open, onClose, court, date, hour }) => {
	const dispatch = useDispatch();

	const classes = useStyles();

	return (
		<div>
			<Modal open={open} onClose={onClose}>
				<div className={classes.container}>
					<div className={classes.closeButton}>
						<IconButton onClick={onClose}>
							<CloseRoundedIcon />
						</IconButton>
					</div>
					<div className={classes.textHolder}>
						<ThemeProvider theme={theme}>
							<Typography color="secondary" className={classes.text}>
								{court + 1}-es pálya
							</Typography>
							<Typography color="secondary" className={classes.lowerText}>
								{moment(date).format('YYYY.MM.DD')}
							</Typography>
							<Typography color="secondary">
								{hour < 10 ? '0'.concat(hour, ':00') : ''.concat(hour, ':00')}
							</Typography>
						</ThemeProvider>
					</div>
					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								dispatch(
									makeAppointment({
										begins: date,
										court: court === 0 ? 'ONE' : 'TWO',
									}),
								);

								onClose();
							}}
						>
							Foglalás
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ReserveModal;
