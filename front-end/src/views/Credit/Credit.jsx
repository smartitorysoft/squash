import React, { useState, useEffect } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "components/TextInput";
import Row from "components/Row/Row";
import { Box } from "@material-ui/core";s

import { getUsers } from "store/user/actions";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "80%",
    backgroundColor: "grey",
  },
}));

const credit = (props) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((state) => state.user.users);

  return (
    <Box>
      <TextInput
        label="Keresés"
        onChange={(text) => {
          setValue(text.target.value);
        }}
      />
      <TableContainer classes={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Név</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Kredit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.items && users.items.map((user) => <Row row={user} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

credit.propTypes = {};

export default credit;
