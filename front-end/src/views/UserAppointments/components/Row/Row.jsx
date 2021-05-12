import React from 'react';
import { Box, TableRow, TableCell, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import {
	deleteAppointment,
	getUserAppointments,
} from 'store/appointments/actions';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';

const Row = ({ row }) => {
	const today = moment(new Date()).format('YYYY.MM.DD.');
	const date = moment(new Date(row.date)).format('YYYY.MM.DD.');
	const hour = moment(new Date(row.begin)).add(-3, 'hours').format('HH:mm');
	const dispatch = useDispatch();

	const deleteAppoin = async (id) => {
		await dispatch(deleteAppointment(id));
		await dispatch(getUserAppointments());
	};

	return (
		<>
			<TableRow key={row.date}>
				<TableCell align="left">{date}</TableCell>
				<TableCell align="left">{hour}</TableCell>
				<TableCell align="right">{row.court === 'ONE' ? '1' : '2'}</TableCell>
				{today < date && (
					<TableCell align="right">
						<IconButton size="small" onClick={() => deleteAppoin(row.id)}>
							<DeleteIcon />
						</IconButton>
					</TableCell>
				)}
			</TableRow>
		</>
	);
};

export default Row;
