import React, { useState } from "react";
import { TableCell, IconButton, TableRow, Collapse } from "@material-ui/core";
import { TextInput } from "../TextInput/TextInput";

export default function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={row.name}>
        <TableCell style={{ width: 20 }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <p>lenyit</p>
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
            <TextInput type="number" label="Kreditek száma" />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
