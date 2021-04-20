import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import TextInput from "components/TextInput";
import BasicButton from "components/BasicButton";
import { register } from "store/auth/actions";
import { Box } from "@material-ui/core";

const Register = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onSubmit = () => {
    dispatch(
      register({
        email,
        password,
        role: "root",
        profile: {
          firstName,
          lastName,
          phone: number,
        },
      })
    );
  };

  return (
    <Box className={styles.container}>
      <TextInput
        label="Vezetéknév"
        onChange={(text) => setLastName(text.target.value)}
      />
      <TextInput
        label="Keresztnév"
        onChange={(text) => setFirstName(text.target.value)}
      />
      <TextInput
        label="Email cím"
        onChange={(text) => setEmail(text.target.value)}
      />
      <TextInput
        label="Telefonszám"
        onChange={(text) => setNumber(text.target.value)}
      />
      <TextInput
        label="Jelszó"
        type="password"
        onChange={(text) => setPassword(text.target.value)}
      />
      <TextInput
        label="Jelszó megerősítése"
        type="password"
        onChange={(text) => setPasswordCheck(text.target.value)}
      />
      <Box className={styles.buttons}>
        <BasicButton label="Regisztrálás" onClick={onSubmit} />
        <BasicButton label="Vissza" onClick={() => router.back()} />
      </Box>
    </Box>
  );
};

export default Register;
