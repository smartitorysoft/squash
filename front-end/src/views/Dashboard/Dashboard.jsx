import React from 'react';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useSelector } from 'react-redux';

const DashboardPage = (props) => {
	const isSignedIn = useSelector((state) => state.auth);
	console.log('fromDash', isSignedIn);
	return (
		<Dashboard>
			{/* <HomeHeader /> */}
		</Dashboard>
	);
};

export default DashboardPage;
