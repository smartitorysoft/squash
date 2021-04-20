import React from "react";

import pageRedirect from "lib/pageRedirect";
import Page from "views/Dashboard";

const Dashboard = (props) => <Page {...props} />;

Dashboard.getInitialProps = async (ctx) => {
  try {
    await pageRedirect({ auth: true, url: "/dashboard" }, ctx);
  } catch (error) {
    throw error;
  }
  return {
    namespacesRequired: ["error", "global", "dashboard"],
  };
};

export default Dashboard;
