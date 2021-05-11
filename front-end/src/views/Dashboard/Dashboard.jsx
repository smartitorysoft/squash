import React from 'react';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'store/me/actions';

const DashboardPage = (props) => {
	return (
		<Dashboard>
			{/* <HomeHeader /> */}
		</Dashboard>
	);
};

export default DashboardPage;
