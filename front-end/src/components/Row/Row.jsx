import React, { useState } from 'react';
import {
	TableCell,
	IconButton,
	TableRow,
	Collapse,
	TextField,
	Box,
	makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { classExpression } from '@babel/types';
import { giveCredit } from '../../store/credit/actions';
import { BasicButton } from '../BasicButton/BasicButton';

const useStyles = makeStyles((theme) => ({
	collapseStyle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}));

export default function Row({ row }) {
	const classes = useStyles();

	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [numberOfCredits, setNumberOfCredits] = useState('0');

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
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box className={classes.collapseStyle}>
							<TextField
								type="number"
								label="Kreditek száma"
								onChange={(text) => setNumberOfCredits(text.target.value)}
							/>
							<BasicButton label="Jóváhagy" onClick={onSubmit} />
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
