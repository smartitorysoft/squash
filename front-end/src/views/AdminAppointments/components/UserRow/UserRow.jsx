import React, { useState } from 'react';

import {
	TextField,
	TableCell,
	IconButton,
	TableRow,
	Collapse,
	Box,
	Button,
	makeStyles,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { makeAdminAppointment } from 'store/appointments/actions';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles(() => ({
	container: {
		width: '100%',
		backgroundColor: 'red',
	},
	collapsed: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 5,
	},
	button: {
		height: 30,
	},
}));

export default function UserRow({ row }) {
	const classes = useStyles();

	const { t } = useTranslation(row.defaultNamespace);

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState('');
	const [court, setCourt] = useState('');
	const [hour, setHour] = useState('');

	const onSubmit = () => {
		const s = date.split('-');

		dispatch(
			makeAdminAppointment({
				userId: row.userId,
				payload: {
					begins: new Date(
						s[0],
						parseInt(s[1], 10) - 1,
						s[2],
						parseInt(hour.split(':')[0], 10) + 3,
						0,
						0,
						0,
					).toISOString(),
					court: court === '1' ? 'ONE' : 'TWO',
				},
			}),
		);
	};

	return (
		<>
			<TableRow key={`${row.name}`}>
				<TableCell align="left">{`${row.name}`}</TableCell>

				<TableCell align="right">{row.credit}</TableCell>

				<TableCell style={{ width: 20 }}>
					<IconButton size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box className={classes.collapsed}>
							<TextField
								label={t('date')}
								onChange={(text) => setDate(text.target.value)}
							/>
							<TextField
								label={t('hour')}
								onChange={(text) => setHour(text.target.value)}
							/>
							<TextField
								type="number"
								label="Pálya"
								onChange={(text) => setCourt(text.target.value)}
							/>
							<Button
								variant="contained"
								color="primary"
								size="small"
								className={classes.button}
								onClick={onSubmit}
							>
								Jóváhagy
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
