import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { Profile } from "views/Profile/Profile";
import ProfileModal from "components/ProfileModal/ProfileModal";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Box } from "@material-ui/core";
import styles from "styles/Header.module.css";

const profile = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box className={styles.home}>
        <Box className={styles.header}>
          <Box className={styles.div}>
            <p> Vezetéknév Keresztnév</p>
            <p>Telefonszám</p>
            <p>Email</p>
          </Box>

          <Box className={styles.div}>
            <p>Kreditek száma</p>
            <p>Következő foglalás</p>
            <p>Kártyaszám</p>
          </Box>

          <Box className={styles.div}>
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
            <ProfileModal open={open} onClose={() => setOpen(false)} />
          </Box>
        </Box>
        <Profile />
      </Box>
    </>
  );
};

profile.propTypes = {};

export default profile;

// export default function profile() {
//   const [open, setOpen] = useState(false);

//   const useStyles = makeStyles((theme) => ({
//     container: {
//       display: "flex",
//       marginLeft: `calc(100% / 8)`,
//     },
//     header: {
//       display: "flex",
//       flexDirection: "row",
//       backgroundColor: "yellow",
//     },
//     div: {
//       width: "25%",
//     },
//   }));

//   const classes = useStyles();

//   return (
//     <Box className={styles.home}>
//       <Box className={styles.header}>
//         <Box className={styles.div}>
//           <p> Vezetéknév Keresztnév</p>
//           <p>Telefonszám</p>
//           <p>Email</p>
//         </Box>
//         <Box className={styles.div}>
//           <p>Kreditek száma</p>
//           <p>Következő foglalás</p>
//           <p>Kártyaszám</p>
//         </Box>

//         <Box className={styles.div}>
//           <IconButton onClick={() => setOpen(true)}>
//             <EditIcon />
//           </IconButton>

//           <ProfileModal open={open} onClose={() => setOpen(false)} />
//         </Box>
//       </Box>
//       <Profile />
//     </Box>
//   );
// }
