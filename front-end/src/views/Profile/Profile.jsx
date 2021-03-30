import React from "react";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import styles from "../../../styles/Profile.module.css";

export const Profile = () => {
  return (
    <div className={styles.size}>
      <ProfileHeader />
    </div>
  );
};
