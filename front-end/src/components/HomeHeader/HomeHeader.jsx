import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import { Profile } from "../../views/Profile/Profile";
import TabPanel from "../TabPanel/TabPanel";
import styles from "../../styles/Header.module.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { GridComponent } from "../Grid/GridComponent";
import { makeStyles } from "@material-ui/core";

export const HomeHeader = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      marginLeft: `calc(100% / 8)`,
    },
    header: {
      flexDirection: "row",
    },
    div: {
      width: "45%",
    },
  }));

  const classes = useStyles();

  const user = useSelector((state) => state.me.info);

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
        <div className={classes.container}>
          <GridComponent />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Foglalás
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.header}>
          <div className={classes.div}>
            <p> Vezetéknév Keresztnév</p>
            <p>Telefonszám</p>
            <p>Email</p>
          </div>
          <div className={classes.div}>
            <p>Kreditek száma</p>
            <p>Következő foglalás</p>
            <p>Kártyaszám</p>
          </div>

          <div className={classes.div}>
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>

            <ProfileModal open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
        <Profile />
      </TabPanel>
    </div>
  );
};
