import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import BasicButton from "components/BasicButton";
import TextInput from "components/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { loadMe } from "store/me/actions";
import { login } from "store/auth/actions";
import { Formik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "calc(50vh - 100px)",
  },

  fields: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  buttons: {
    display: "flex",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "400",
  },
}));

const SignIn = () => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(loadMe());
      router.push("/dashboard");
    }
  }, [isSignedIn]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string(),
  })


  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Formik validationSchema = {LoginSchema}>
        <TextInput
          className={classes.field}
          label="Email cím"
          onChange={(text) => setEmail(text.target.value)}
        />
        <TextInput
          className={classes.field}
          label="Jelszó"
          type="password"
          onChange={(text) => setPassword(text.target.value)}
        />
        </Formik>
        {/* <TextInput
          className={classes.field}
          label="Email cím"
          onChange={(text) => setEmail(text.target.value)}
        />
        <TextInput
          className={classes.field}
          label="Jelszó"
          type="password"
          onChange={(text) => setPassword(text.target.value)}
        /> */}

        <Box className={classes.buttons}>
          <BasicButton
            label="Belépés"
            onClick={() =>
              dispatch(
                login({
                  email,
                  password,
                })
              )
            }
          />
          <BasicButton
            onClick={() => {
              router.push("/register");
            }}
            label="Regisztráció"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
