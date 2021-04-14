import React, { useState, useEffect } from 'react';
import {
	Table, TableCell, TableContainer,
	TableHead, TableRow, TableBody,
	Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../src/components/TextInput';
import styles from '../styles/Table.module.css';
import Row from '../src/components/Row/Row';

import { getUsers } from '../store/user/actions';

export default function credit() {
	const [value, setValue] = useState('');
	const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const users = useSelector((state) => state.user.users);

	return (
		<div>
			<TextInput
				label='Keresés'
				onChange={(text) => {
					setValue(text.target.value);
				}}
			/>
			<TableContainer classes={styles.table} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell align='left'>Név</TableCell>
							<TableCell align='left'>Email</TableCell>
							<TableCell align='right'>Kredit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.items
              && users.items.map((user) => (
              	<Row row={user} />
            	))}
					</TableBody>

				</Table>
			</TableContainer>

		</div>
	);
}
