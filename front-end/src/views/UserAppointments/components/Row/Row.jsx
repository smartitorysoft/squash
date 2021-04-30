import {
	Box, TableRow, TableCell, IconButton,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteAppointment } from 'store/appointments/actions';

const Row = ({ row }) => {
	const dispatch = useDispatch();

	const deleteAppoin = (id) => {
		dispatch(deleteAppointment(id));
	};

	return (
		<Box>
			<TableRow key={row.date}>
				<TableCell align='left'>{row.date}</TableCell>
				<TableCell align='left'>
					{row.begin}
				</TableCell>
				<TableCell align='right'>{row.court}</TableCell>
				<TableCell align='right'>
					<IconButton size='small' onClick={() => deleteAppoin(row.id)}>
						<DeleteIcon />
					</IconButton>
				</TableCell>
			</TableRow>
		</Box>
	);
};

export default Row;
