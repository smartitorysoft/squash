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
import { useSelector } from 'react-redux';
import TextInput from 'components/TextInput';
import Row from 'components/Row/Row';

import Dashboard from 'components/Layout/Navigation/Dashboard';

import useTranslation from 'next-translate/useTranslation';
import { useErrorHandling } from 'components/error';

const useStyles = makeStyles((theme) => ({
	table: {
		width: '100%',
	},
}));

const Credit = (props) => {
	const { defaultNamespace } = props;

	// TODO: user keresése

	const classes = useStyles();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const users = useSelector((state) => state.user.users);

	return (
		<Dashboard>
			<Box>
				<TableContainer className={classes.table} component={Paper}>
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
								users.items.map((user) => <Row key={user.id} row={user} />)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Dashboard>
	);
};

Credit.propTypes = {};

export default Credit;
