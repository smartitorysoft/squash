import {
	Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import  Row  from './components/Row/Row';

const useStyles = makeStyles((theme) => ({
	table: {
		width: '100%',
	},
}));

const UserAppointments = (props) => {
	const appointments = useSelector((state) => state.appointments.appointments);

	console.log('appointments', appointments);

	const classes = useStyles();

	return (
		<Box className={classes.table}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Időpont</TableCell>
							<TableCell align='left'>Óra</TableCell>
							<TableCell align='right'>Pálya</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{appointments.list.map((listItem) =>
							listItem.reserved.map((reservation) => {
								// console.log('res', reservation);
								const row = {
									date: listItem.date,
									begin: reservation.begins,
									court: reservation.court,
									id: reservation.id,
								};
								return <Row row={row} />;
							}),
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default UserAppointments;
