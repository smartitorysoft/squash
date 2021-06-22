import React, { useState } from 'react';
import {
	TableCell,
	IconButton,
	TableRow,
	Collapse,
	Box,
	TableBody,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import * as moment from 'moment';
import { deleteAppointmentAdmin } from 'store/appointments/actions';
import DeleteIcon from '@material-ui/icons/Delete';

const Row = ({ row }) => {
	const dispatch = useDispatch();

	const onSubmit = () => {};

	const begins = new Date(row.begins);
	const date = moment(begins).format('YYYY-MM-DD');
	const hour = moment(begins).subtract(3, 'hours').format('HH:mm');

	return (
		<TableRow key={row.name}>
			<TableCell align="left">
				{`${row.user.profile.firstName} ${row.user.profile.lastName}`}
			</TableCell>
			<TableCell align="left">{date}</TableCell>
			<TableCell align="right">{hour}</TableCell>
			<TableCell align="right">{row.court}</TableCell>
			<TableCell style={{ width: 20 }}>
				<IconButton
					size="small"
					onClick={() => dispatch(deleteAppointmentAdmin(row.id))}
				>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default Row;
