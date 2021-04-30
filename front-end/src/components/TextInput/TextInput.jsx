import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export const TextInput = ({ label, type, onChange, InputProps }) => (
  <div>
    <TextField
      InputProps={InputProps}
      onChange={onChange}
      label={label}
      type={type}
      style={{ width: 300 }}
    />
  </div>
);

export default TextInput;
