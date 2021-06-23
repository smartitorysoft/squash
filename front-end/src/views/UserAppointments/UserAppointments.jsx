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
import * as moment from 'moment';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import useTranslation from 'next-translate/useTranslation';
import Row from './components/Row/Row';

const useStyles = makeStyles((theme) => ({
	table: {
		width: '100%',
	},
}));

const UserAppointments = (props) => {
	const appointments = useSelector((state) => state.appointments.appointments);

	const { defaultNamespace } = props;

	console.log(defaultNamespace);

	const { t } = useTranslation(defaultNamespace);

	const classes = useStyles();

	return (
		<Dashboard>
			<Box className={classes.table}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">{t('date')}</TableCell>
								<TableCell align="left">{t('hour')}</TableCell>
								<TableCell align="right">{t('court')}</TableCell>
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
		</Dashboard>
	);
};

export default UserAppointments;
