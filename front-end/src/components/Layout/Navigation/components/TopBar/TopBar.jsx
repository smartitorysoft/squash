import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
	AppBar,
	Toolbar,
	IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: 2,
		boxShadow: 'none',
	},
	openMenuButton: {
		color: theme.palette.primary.contrastText,
	},
}));

const TopBar = (props) => {
	const { onOpenNavBarMobile } = props;
	const classes = useStyles();

	return (
		<AppBar id='top-bar' className={classes.root} color='primary'>
			<Toolbar>
				<IconButton
					className={classes.openMenuButton}
					id='icon-button-menu'
					onClick={onOpenNavBarMobile}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

TopBar.propTypes = {
	onOpenNavBarMobile: PropTypes.func.isRequired,
};

export default TopBar;
