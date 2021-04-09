import React, { useState } from "react";
import { TableCell, IconButton, TableRow, Collapse } from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { giveCredit } from "../../../store/credit/actions";
import { useDispatch } from "react-redux";
import BasicButton from "../BasicButton/BasicButton";

export default function Row({ row }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [numberOfCredits, setNumberOfCredits] = useState("0");

  const onSubmit = (value) => {
    dispatch(giveCredit(numberOfCredits));
  };

  return (
    <>
      <TableRow key={row.name}>
        <TableCell style={{ width: 20 }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.credit}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TextInput
              type="number"
              label="Kreditek száma"
              onChange={(text) => setNumberOfCredits(text.target.values)}
            />
            <BasicButton label="Jóváhagy" onClick={onSubmit} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
