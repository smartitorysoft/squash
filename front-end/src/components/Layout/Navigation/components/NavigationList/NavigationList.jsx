import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';

import NavigationListItem from './components/NavigationListItem';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(3),
	},
}));

const reduceChildRoutes = (props) => {
	const {
		router, items, page, depth,
	} = props;

	if (page.pages) {
		let open = false;

		if (router.pathname === page.pages.href) {
			open = true;
		}

		page.pages.map((item) => {
			if (router.pathname === item.href) {
				open = true;
			}
		});

		items.push(
			<NavigationListItem
				depth={depth}
				icon={page.icon}
				key={page.title}
				label={page.label}
				open={Boolean(open)}
				title={page.title}
			>
				<NavigationList
					depth={depth + 1}
					pages={page.pages}
					router={router}
				/>
			</NavigationListItem>,
		);
	} else {
		items.push(
			<NavigationListItem
				depth={depth}
				href={page.href}
				icon={page.icon}
				key={page.title}
				label={page.label}
				title={page.title}
			/>,
		);
	}

	return items;
};

const NavigationList = (props) => {
	const { pages, ...rest } = props;

	return (
		<List>
			{pages.reduce(
				(items, page) => reduceChildRoutes({ items, page, ...rest }),
				[],
			)}
		</List>
	);
};

NavigationList.propTypes = {
	depth: PropTypes.number,
	pages: PropTypes.array,
};

const Navigation = (props) => {
	const {
		title,
		navigation,
		className,
		component: Component,
		...rest
	} = props;

	const classes = useStyles();
	const router = useRouter();

	return (
		<Component {...rest} className={clsx(classes.root, className)}>
			{title && <Typography variant='overline'>{title}</Typography>}
			<NavigationList depth={0} pages={navigation} router={router} />
		</Component>
	);
};

Navigation.propTypes = {
	className: PropTypes.string,
	component: PropTypes.any,
	navigation: PropTypes.array.isRequired,
};

Navigation.defaultProps = {
	component: 'nav',
};

export default Navigation;
