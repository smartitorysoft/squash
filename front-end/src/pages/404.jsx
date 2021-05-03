import React from 'react';

// import PageNotFound from "views/_Error/PageNotFound";
// import NetworkError from "views/_Error/NetworkError";
// import Unauthorized from "views/_Error/Unauthorized";

const ErrorPage = (props) => {
	const { status } = props;

	// if (status === "NETWORK_ERROR" || status === "INTERNAL_SERVER_ERROR") {
	//   return <NetworkError {...props} />;
	// }

	// if (status === "UNAUTHORIZED") {
	//   return <Unauthorized {...props} />;
	// }

	// return <PageNotFound {...props} />;
};

export default ErrorPage;
