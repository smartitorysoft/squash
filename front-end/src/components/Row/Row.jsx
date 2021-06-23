import React, { useState } from 'react';
import {
	TableCell,
	IconButton,
	TableRow,
	Collapse,
	Box,
	makeStyles,
	Button,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { giveCredit } from '../../store/credit/actions';
import { TextInput } from '../TextInput/TextInput';
import { BasicButton } from '../BasicButton/BasicButton';

const useStyles = makeStyles(() => ({
	collapsed: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10,
	},
}));

export default function Row(props) {
	const { row, defaultNamespace } = props;

	const [open, setOpen] = useState(false);
	const [numberOfCredits, setNumberOfCredits] = useState('0');

	const dispatch = useDispatch();
	const classes = useStyles();
	const { t } = useTranslation(defaultNamespace);

	const onSubmit = () => {
		dispatch(giveCredit({ value: Number(numberOfCredits), id: row.id }));
	};

	return (
		<>
			<TableRow key={row.name}>
				<TableCell style={{ width: 20 }}>
					<IconButton size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.profile.firstName}
				</TableCell>
				<TableCell align="left">{row.email}</TableCell>
				<TableCell align="right">{row.credit}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box className={classes.collapsed}>
							<TextInput
								type="number"
								label={t('creditNumber')}
								onChange={(text) => setNumberOfCredits(text.target.value)}
							/>
							<Button
								variant="contained"
								size="small"
								color="primary"
								onClick={onSubmit}
							>
								{t('approve')}
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
