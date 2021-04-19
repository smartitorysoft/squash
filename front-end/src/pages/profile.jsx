import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { Profile } from "views/Profile/Profile";
import ProfileModal from "components/ProfileModal/ProfileModal";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Box } from "@material-ui/core";

export default function profile() {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "red",
    },
    div: {
      display: "flex",
      width: "45%",
      backgroundColor: "red",
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box className={classes.div}>
          <p> Vezetéknév Keresztnév</p>
          <p>Telefonszám</p>
          <p>Email</p>
        </Box>
        <Box className={classes.div}>
          <p>Kreditek száma</p>
          <p>Következő foglalás</p>
          <p>Kártyaszám</p>
        </Box>

        <Box className={classes.div}>
          <IconButton onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>

          <ProfileModal open={open} onClose={() => setOpen(false)} />
        </Box>
      </Box>
      <Profile />
    </Box>
  );
}
