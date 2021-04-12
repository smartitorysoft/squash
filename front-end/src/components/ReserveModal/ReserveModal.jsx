import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
} from "@material-ui/core";
import styles from "../../../styles/ReserveModal.module.css";
import { makeStyles } from "@material-ui/core/styles";

export const ReserveModal = ({ open, onClose, reserved }) => {
  const [checked, setChecked] = useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      height: "50%",
      backgroundColor: "white",
      marginLeft: `calc(100% / 8)`,
      marginTop: `calc(100% / 8)`,
      borderRadius: 5,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className={classes.container}>
          <div
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormGroup row>
              <FormControlLabel
                disabled={reserved && reserved.includes("1")}
                control={
                  <Checkbox
                    checked={checked.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
                label="1-es pálya"
              />
              <FormControlLabel
                disabled={reserved && reserved.includes("2")}
                control={
                  <Checkbox
                    checked={checked.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                  />
                }
                label="2-es pálya"
              />
            </FormGroup>
          </div>
          <Button variant="contained" color="primary">
            Foglalás
          </Button>
        </div>
      </Modal>
    </div>
  );
};
