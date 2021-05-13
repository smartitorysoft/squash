import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import useTranslation from 'next-translate/useTranslation';
import { useErrorHandling } from 'components/error';
import Row from './components/Row/Row';

const useStyles = makeStyles((theme) => ({
	table: {
		width: '100%',
	},
}));

const UserAppointments = (props) => {
	const appointments = useSelector((state) => state.appointments.list);

	const { defaultNamespace } = props;

	const classes = useStyles();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	return (
		<Dashboard>
			<Box className={classes.table}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">Időpont</TableCell>
								<TableCell align="left">Óra</TableCell>
								<TableCell align="right">Pálya</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{appointments.map((listItem) =>
								listItem.reserved.map((reservation) => (
									// console.log('res', reservation);
									<Row
										row={{
											date: listItem.date,
											begin: reservation.begins,
											court: reservation.court,
											id: reservation.id,
										}}
									/>
								)),
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Dashboard>
	);
};

export default UserAppointments;
