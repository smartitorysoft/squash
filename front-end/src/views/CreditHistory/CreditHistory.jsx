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
	Typography,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import * as moment from 'moment';

import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
	},
	table: {
		width: '100%',
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00C853',
			contrastText: '#fff',
		},
		secondary: {
			main: '#07671E',
			contrastText: '#fff',
		},
	},
});

const CreditHistory = (props) => {
	const classes = useStyles();

	const { defaultNamespace } = props;
	const { t } = useTranslation(defaultNamespace);

	const user = useSelector((state) => state.me);
	const creditHistory = useSelector((state) => state.credit.creditHistory);

	return (
		<Dashboard>
			<Box className={classes.container}>
				<ThemeProvider theme={theme}>
					<Paper>
						<Box className={classes.header}>
							<Typography color="secondary">
								{t('credit-number')}: {user.credit}
							</Typography>
						</Box>
					</Paper>
					<TableContainer className={classes.table} component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell style={{ color: '#07671E' }}>
										{t('credit-number')}
									</TableCell>
									<TableCell style={{ color: '#07671E' }}>
										{t('sign')}
									</TableCell>
									<TableCell style={{ color: '#07671E' }}>
										{t('type')}
									</TableCell>
									<TableCell style={{ color: '#07671E' }} align="right">
										{t('date')}
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{creditHistory &&
									creditHistory
										.sort((a, b) => new Date(a.date) - new Date(b.date))
										.map((credit) => (
											<TableRow key={credit.date}>
												<TableCell style={{ color: '#07671E' }}>
													{credit.quantity}
												</TableCell>
												<TableCell style={{ color: '#07671E' }}>
													{credit.sign === '+' ? '+' : '-'}
												</TableCell>
												{/* <TableCell style={{ color: '#07671E' }}>{credit.sign === 'positive' ? '+' : '-'</TableCell> */}
												<TableCell style={{ color: '#07671E' }}>
													{t(credit.type)}
												</TableCell>
												<TableCell style={{ color: '#07671E' }} align="right">
													{moment(credit.date).format('YYYY-MM-DD')}{' '}
												</TableCell>
											</TableRow>
										))}
							</TableBody>
						</Table>
					</TableContainer>
				</ThemeProvider>
			</Box>
		</Dashboard>
	);
};

export default CreditHistory;
