import React, { useEffect, useState } from 'react';
import {
	Box,
	Grid,
	Typography,
	Paper,
	makeStyles,
	Link,
	ThemeProvider,
	createMuiTheme,
	IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { red, green } from '@material-ui/core/colors';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Card from '../Card';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	days: {
		display: 'flex',
		flexDirection: 'Column',
		marginLeft: 45,
		marginRight: 45,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	daysPaper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	gridColumn: {
		marginTop: 15,
	},
	bold: {
		fontWeights: '700',
		fontSize: 16,
	},
	gridBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00C853',
		height: '100%',
		width: '100%',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
	},
	gridBoxText: {
		color: 'white',
	},
	reservedText: {
		fontSize: 12,
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

const GridComponent = (props) => {
	const classes = useStyles();

	const { defaultNamespace } = props;
	const { t } = useTranslation(defaultNamespace);
	const date = new Date();

	const [firstDayOfTheWeekDate, setFirstDayOfTheWeekDate] = useState(
		new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000),
	);

	const appointments = useSelector((state) => state.appointments.appointments);

	const days = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];

	const reservedAppointments = [];
	appointments.list
		.map((appointment) =>
			appointment.reserved.map((app) => {
				const rd = new Date(app.begins);
				return {
					day: rd.getDate(),
					reservation: {
						hour: rd.getHours() - 3,
						court: app.court,
					},
				};
			}),
		)
		.map((mapped) => mapped.map((m) => reservedAppointments.push(m)));

	const dateFormat = (formDate) => {
		const month =
			formDate.getMonth() < 10
				? '0'.concat(formDate.getMonth() + 1)
				: formDate.getMonth() + 1;
		return formDate.getDate() < 10
			? ''.concat(month, '.0', formDate.getDate())
			: ''.concat(month, '.', formDate.getDate());
	};

	const courts = ['ONE', 'TWO'];

	const reserved = (resApp, hour, currentDate, court) => {
		if (resApp.length > 0) {
			return resApp.some(
				(element) =>
					element.day === currentDate.getDate() &&
					element.reservation.hour === hour &&
					element.reservation.court === court,
			);
		}
		return false;
	};

	return (
		<Box>
			<Paper className={classes.daysPaper}>
				<IconButton
					onClick={() =>
						setFirstDayOfTheWeekDate(
							new Date(
								firstDayOfTheWeekDate.getTime() - 7 * 24 * 60 * 60 * 1000,
							),
						)
					}
				>
					<ArrowLeftIcon style={{ color: green[500] }} />
				</IconButton>
				{days.map((day, index) => (
					<Box key={day} className={classes.days}>
						<ThemeProvider theme={theme}>
							<Typography color="secondary">{t(day)}</Typography>
							<Typography color="secondary" className={classes.bold}>
								{dateFormat(
									new Date(
										firstDayOfTheWeekDate.getTime() +
											index * 24 * 60 * 60 * 1000,
									),
								)}
							</Typography>
						</ThemeProvider>
					</Box>
				))}
				<IconButton
					onClick={() =>
						setFirstDayOfTheWeekDate(
							new Date(
								firstDayOfTheWeekDate.getTime() + 7 * 24 * 60 * 60 * 1000,
							),
						)
					}
				>
					<ArrowRightIcon style={{ color: green[500] }} />
				</IconButton>
			</Paper>
			{courts.map((court, courtIndex) => (
				<Grid key={court} container>
					<Grid item xs={12}>
						<Grid container direction="row" justify="space-evenly">
							{[...Array(7).keys()].map((value) => (
								<Grid key={value} item xs={1}>
									<Grid container spacing={1} className={classes.gridColumn}>
										<Paper className={classes.paper}>
											<ThemeProvider theme={theme}>
												<Box className={classes.gridBox}>
													<Typography className={classes.gridBoxText}>
														{courtIndex + 1}-es pálya
													</Typography>
												</Box>
											</ThemeProvider>

											<Grid item>
												<Grid
													container
													direction="column"
													justify="space-between"
													spacing={1}
												>
													{/* {value < 5 ? */}
													{[...Array(15).keys()].map((itemValue) => {
														const currentDate = new Date(
															firstDayOfTheWeekDate.getTime() +
																value * 24 * 60 * 60 * 1000,
														);
														const currentHour = itemValue + 8;

														return reserved(
															reservedAppointments,
															currentHour,
															currentDate,
															court,
														) ? (
															<Box className={classes.full}>
																<ThemeProvider theme={theme}>
																	<Typography
																		className={classes.reservedText}
																		color="error"
																	>
																		{currentHour < 10
																			? '0'.concat(currentHour, ':00')
																			: ''.concat(currentHour, ':00')}
																	</Typography>
																</ThemeProvider>
															</Box>
														) : (
															<Grid key={itemValue} item>
																<Card
																	date={currentDate}
																	hour={currentHour}
																	reservedAppointments={reservedAppointments}
																	court={courtIndex}
																/>
															</Grid>
														);
													})}
													{/* )) : [...Array(15).keys()].map((itemValue) => (
												<Grid key={itemValue} item>
													<Card
														date={date}
														day={value + firstDayOfTheWeeK}
														hour={itemValue + 8}
														reservedAppointments={reservedAppointments}
													/>
												</Grid>
												)) */}
												</Grid>
											</Grid>
										</Paper>
									</Grid>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			))}
		</Box>
	);
};

export default GridComponent;
