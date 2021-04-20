import React from "react";

import pageRedirect from "lib/pageRedirect";
import Page from "views/Credit";

const Credit = (props) => <Page {...props} />;

Credit.getInitialProps = async (ctx) => {
  try {
    await pageRedirect({ auth: true, url: "/credit" }, ctx);
  } catch (error) {
    throw error;
  }
  return {
    namespacesRequired: ["error", "global", "credit"],
  };
};

export default Credit;
