import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import { Profile } from "../../views/Profile/Profile";
import TabPanel from "../TabPanel/TabPanel";
import styles from "../../../styles/Header.module.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { GridComponent } from "../Grid/GridComponent";
import { makeStyles } from "@material-ui/core";
import { makeAppointment } from "../../../store/appointments/actions";

export const HomeHeader = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.me);

  const useStyles = makeStyles((theme) => ({
    container: {
      marginLeft: `calc(100% / 8)`,
    },
  }));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  dispatch(
    makeAppointment({
      begins: "2021-04-13T14:15:22Z",
      court: "ONE",
    })
  );

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
