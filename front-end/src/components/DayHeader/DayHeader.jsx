import React from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
}));

const DayHeader = (props) => {
	const classes = useStyles();

	const { date } = props;

	return <Paper className={classes.paper} />;
};

export default DayHeader;
