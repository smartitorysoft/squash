import { classExpression } from '@babel/types';
import {
	Box,
	makeStyles,
	Table,
	TableContainer,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	Paper,
} from '@material-ui/core';
import Dashboard from 'components/Layout/Navigation/Dashboard';

import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	table: {
		width: '100%',
	},
}));

const CreditHistory = (props) => {
	const classes = useStyles();
	const { defaultNamespace } = props;
	const { t } = useTranslation(defaultNamespace);

	const user = useSelector((state) => state.me);
	const creditHistory = useSelector((state) => state.credit.creditHistory);

	return (
		<Dashboard>
			<Box className={classes.container}>
				<TableContainer className={classes.table} component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>{t('credit-number')}</TableCell>
								<TableCell align="right">{t('date')}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{creditHistory &&
								creditHistory.map((credit) => (
									<TableRow key={credit.date}>
										<TableCell>{credit.quantity}</TableCell>
										<TableCell align="right">{credit.date}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Dashboard>
	);
};

export default CreditHistory;
