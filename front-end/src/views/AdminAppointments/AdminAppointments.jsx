import Dashboard from 'components/Layout/Navigation/Dashboard';
import React from 'react';
import { useSelector } from 'react-redux';
import {
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	Paper,
	makeStyles,
	Box,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useErrorHandling } from 'components/error';

const useStyles = makeStyles(() => ({
	table: {
		width: '80%',
		backgroundColor: 'grey',
	},
}));

const AdminAppointments = (props) => {
	const classes = useStyles();

	const { defaultNamespace } = props;

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const appointments = useSelector(
		(state) => state.appointments.adminAppointments,
	);

	const userAppointments = useSelector(
		(state) => state.appointments.appointments,
	);

	const users = useSelector((state) => state.user.users);

	console.log('all appointments', appointments.list);
	console.log('user appointments', userAppointments);

	return (
		<Dashboard>
			<Box>
				<TableContainer className={classes.table} component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell align="left">{t('name')}</TableCell>
								<TableCell align="left">{t('date')}</TableCell>
								<TableCell align="right">{t('hour')}</TableCell>
								<TableCell align="right">{t('court')}</TableCell>
							</TableRow>
						</TableHead>
						{/* <TableBody>
							{users.items &&
								users.items.map((user) => <Row key={user.id} row={user} />)}
						</TableBody> */}
					</Table>
				</TableContainer>
			</Box>
		</Dashboard>
	);
};

export default AdminAppointments;
