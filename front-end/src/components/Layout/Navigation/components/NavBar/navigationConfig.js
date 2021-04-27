// import React from 'react';
import { useSelector } from 'react-redux';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person';

const navigationConfig = (t) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const role = useSelector((state) => state.me.role);

	const adminNavigation = [
		{
			title: 'components.nav-bar.dashboard',
			href: '/dashboard',
			icon: BarChartIcon,
		},
		{
			title: 'components.nav-bar.profile',
			href: '/profile',
			icon: PersonIcon,
		},
		{
			title: 'components.nav-bar.credit',
			href: '/credit',
			icon: MonetizationOnIcon,
		},
		// {
		// 	title: 'components.nav-bar.sets',
		// 	icon: BarChartIcon,
		// 	pages: [
		// 		{
		// 			title: 'components.nav-bar.items',
		// 			href: '/items',
		// 		},
		// 		{
		// 			title: 'components.nav-bar.products',
		// 			href: '/products',
		// 		},
		// 	],
		// },
	];

	const userNavigation = adminNavigation;

	const otherNavigation = [
		{
			title: 'components.nav-bar.feedback',
			href: '/feedback',
			icon: HelpOutlineIcon,
		},
		{
			title: 'components.nav-bar.customer-service',
			href: '/support',
			icon: HelpOutlineIcon,
		},
	];

	if (role === 'admin' || role === 'root') {
		return { base: adminNavigation, other: otherNavigation };
	}
	return { base: userNavigation, other: otherNavigation };
};

export default navigationConfig;
