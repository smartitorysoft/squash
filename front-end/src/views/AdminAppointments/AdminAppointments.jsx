import Dashboard from 'components/Layout/Navigation/Dashboard';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Table,
	TableCell,
	TableContainer,
	TablePagination,
	TableHead,
	TableRow,
	TableBody,
	Paper,
	makeStyles,
	Box,
	Button,
	Modal,
	TextField,
	IconButton,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

import { useErrorHandling } from 'components/error';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import Row from './components/Row/Row';
import UserRow from './components/UserRow/UserRow';

const useStyles = makeStyles(() => ({
	table: {
		width: '100%',
		padding: 10,
	},
	container: {
		width: '75%',
		backgroundColor: 'white',
		marginLeft: 'calc(100% / 8)',
		marginTop: 'calc(100% / 16)',
		borderRadius: 5,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		paddingLeft: 30,
	},
	root: {
		padding: 10,
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

	const userList = useSelector((state) => state.user.users);

	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState(userList.items);

	const arr = [
		{ value: { innerValue: 'a' } },
		{ value: { innerValue: 'c' } },
		{ value: { innerValue: 'e' } },
		{ value: { innerValue: 'b' } },
		{ value: { innerValue: 'd' } },
		{ value: { innerValue: 'g' } },
		{ value: { innerValue: 'f' } },
	];

	users.sort((a, b) => {
		if (a.profile.firstName > b.profile.firstName) {
			return 1;
		}
		return b.profile.firstName > a.profile.firstName ? -1 : 0;
	});

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	users.sort((a, b) => a.firstName - b.firstName);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const searchInUsers = (text) =>
		text !== ''
			? setUsers(
					userList.items
						.filter((user) => {
							const fullName = `${user.profile.firstName} ${user.profile.lastName}`;
							if (fullName.includes(text)) {
								return user;
							}
						})
						.map((filteredUser) => filteredUser),
			  )
			: setUsers(userList.items);

	return (
		<Dashboard>
			<Box>
				<TableContainer className={classes.table} component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="left">{t('name')}</TableCell>
								<TableCell align="left">{t('date')}</TableCell>
								<TableCell align="right">{t('hour')}</TableCell>
								<TableCell align="right">{t('court')}</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{appointments &&
								appointments.list.map(
									(day) =>
										day.reserved.length > 0 &&
										day.reserved.map((appointment) => (
											<Row key={appointment.id} row={appointment} />
										)),
								)}
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
				>
					Új foglalás
				</Button>
				<Modal open={open}>
					<Box className={classes.container}>
						<Box className={classes.modalHeader}>
							<TextField
								label="Keresés"
								onChange={(text) => {
									searchInUsers(text.target.value);
								}}
							/>
							<IconButton onClick={() => setOpen(false)}>
								<HighlightOffRoundedIcon />
							</IconButton>
						</Box>
						<TableContainer>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell align="left">{t('name')}</TableCell>
										<TableCell align="right">{t('credit')}</TableCell>
										<TableCell align="right" />
									</TableRow>
								</TableHead>
								<TableBody>
									{users &&
										users
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											.map((user) => (
												<UserRow
													key={`${user.profile.firstName} ${user.profile.lastName}`}
													row={{
														defaultNamespace,
														userId: user.id,
														credit: user.credit,
														name: `${user.profile.firstName} ${user.profile.lastName}`,
													}}
												/>
											))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 15]}
							component="div"
							count={users.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Box>
				</Modal>
			</Box>
		</Dashboard>
	);
};

export default AdminAppointments;
