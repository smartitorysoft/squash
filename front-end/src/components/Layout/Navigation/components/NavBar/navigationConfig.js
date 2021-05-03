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
			title: t('components.nav-bar.dashboard'),
			href: '/dashboard',
			icon: BarChartIcon,
		},
		{
			title: t('components.nav-bar.profile'),
			href: '/profile',
			icon: PersonIcon,
		},
		{
			title: t('components.nav-bar.credit'),
			href: '/credit',
			icon: MonetizationOnIcon,
		},
		{
			title: t('components.nav-bar.courts'),
			icon: BarChartIcon,
			pages: [
				{
					title: t('components.nav-bar.court-types'),
					href: '/items',
				},
				{
					title: t('components.nav-bar.edit-courts'),
					href: '/products',
				},
			],
		},
		{
			title: t('components.nav-bar.timesheet'),
			href: '/timesheet',
			icon: MonetizationOnIcon,
		},
	];

	const userNavigation = [
		{
			title: t('components.nav-bar.dashboard'),
			href: '/dashboard',
			icon: BarChartIcon,
		},
		{
			title: t('components.nav-bar.profile'),
			href: '/profile',
			icon: PersonIcon,
		},
		{
			title: t('components.nav-bar.credit'),
			href: '/credit',
			icon: MonetizationOnIcon,
		},
	];

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
