import React from 'react';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import GridComponent from 'components/Grid/GridComponent';

const DashboardPage = (props) => {
	const { defaultNamespace } = props;

	return (
		<Dashboard>
			<GridComponent defaultNamespace={defaultNamespace} />
		</Dashboard>
	);
};
export default DashboardPage;
