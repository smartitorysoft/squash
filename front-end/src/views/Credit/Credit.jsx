import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import TextInput from 'components/TextInput';
import Row from 'components/Row/Row';

import { getUsers } from 'store/user/actions';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	container: { paddingBottom: 15, paddingLeft: 20 },
}));

const Credit = (props) => {
	const [value, setValue] = useState('');

	const { defaultNamespace } = props;

	const { t } = useTranslation(defaultNamespace);

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const users = useSelector((state) => state.user.users);

	return (
		<Dashboard>
			<Box>
				<Box className={classes.container}>
					<TextInput
						label={t('search')}
						onChange={(text) => {
							setValue(text.target.value);
						}}
					/>
				</Box>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell align="left">{t('name')}</TableCell>
								<TableCell align="left">{t('email')}</TableCell>
								<TableCell align="right">{t('credit')}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.items &&
								users.items.map((user) => (
									<Row
										key={user.id}
										row={user}
										defaultNamespace={defaultNamespace}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Dashboard>
	);
};

Credit.propTypes = {};

export default Credit;
