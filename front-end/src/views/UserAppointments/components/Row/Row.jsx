import {
	Box, TableRow, TableCell, IconButton,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteAppointment } from 'store/appointments/actions';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import { getUserAppointments } from '../../../../../store/appointments/actions';

const Row = ({ row }) => {
	const date = moment(new Date(row.date)).format('YYYY.MM.DD.');
	const hour = moment(new Date(row.begin)).add(-3, 'hours').format('HH:mm');
	console.log('ROW', hour);
	const dispatch = useDispatch();

	const deleteAppoin = (id) => {
		dispatch(deleteAppointment(id));
		dispatch(getUserAppointments());
	};

	return (
		<>
			<TableRow key={row.date}>
				<TableCell align='left'>{date}</TableCell>
				<TableCell align='left'>
					{hour}
				</TableCell>
				<TableCell align='right'>{row.court === 'ONE' ? '1' : '2'}</TableCell>
				<TableCell align='right'>
					<IconButton size='small' onClick={() => deleteAppoin(row.id)}>
						<DeleteIcon />
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};

export default Row;
