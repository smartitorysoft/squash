import React, { useState } from "react";
import { AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import { Profile } from "../../views/Profile/Profile";
import TabPanel from "../TabPanel/TabPanel";
import styles from "../../../styles/Header.module.css";
import ProfileModal from "../ProfileModal/ProfileModal";

export const HomeHeader = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.home}>
      <AppBar style={{ alignItems: "flex-end" }} position="sticky">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Home" />
          <Tab label="Foglalás" />
          <Tab label="Profil" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel value={value} index={1}>
        Foglalás
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={styles.header}>
          <div className={styles.div}>
            <p> Vezetéknév Keresztnév</p>
            <p>Telefonszám</p>
            <p>Email</p>
          </div>
          <div className={styles.div}>
            <p>Kreditek száma</p>
            <p>Következő foglalás</p>
            <p>Kártyaszám</p>
          </div>

          <div className={styles.div}>
            <IconButton onClick={() => setOpen(true)}>
              <p>Szerkeszt</p>
            </IconButton>

            <ProfileModal open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
        <Profile />
      </TabPanel>
    </div>
  );
};
