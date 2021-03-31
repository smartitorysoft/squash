import React from "react";
import TextField from "@material-ui/core/TextField";

export const TextInput = ({ label, type, value, onChange }) => {
  return (
    <div>
      <TextField
        value={value}
        label={label}
        type={type}
        onChange={onChange}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default TextInput;
