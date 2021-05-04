import React from 'react';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'store/me/actions';

const DashboardPage = (props) => {
	const isSignedIn = useSelector((state) => state.auth);
	console.log('fromDash', isSignedIn);
	const dispatch = useDispatch();
	dispatch(getMe());
	return (
		<Dashboard>
			{/* <HomeHeader /> */}
		</Dashboard>
	);
};

export default DashboardPage;
