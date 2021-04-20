import React from "react";
import { makeStyles, Modal } from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";
import { BasicButton } from "../BasicButton/BasicButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    width: "75%",
    height: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    marginLeft: "calc(100% / 8)",
    marginTop: "calc(100% / 8)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  boxes: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
}));

export const ProfileModal = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className={classes.modal}>
          <TextInput label="Vezetéknév" />
          <TextInput label="Keresztnév" />
          <TextInput label="Email cím" />
          <TextInput label="Telefonszám" type="number" />
          <BasicButton
            label="Változtat"
            onClick={() => {
              alert("clicked");
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;
