import React from "react";

import pageRedirect from "lib/pageRedirect";
import Page from "views/Profile";

const Profile = (props) => <Page {...props} />;

Profile.getInitialProps = async (ctx) => {
  try {
    await pageRedirect({ auth: true, url: "/profile" }, ctx);
  } catch (error) {
    throw error;
  }
  return {
    namespacesRequired: ["error", "global", "profile"],
  };
};

export default Profile;
