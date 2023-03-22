import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPng from "../images/SignUp.png";
import Logo from "../images/Logo/Logo01.png";
import {
  FormControl,
  FormHelperText,
  Paper,
  Link,
  Grid,
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Ceylon Models
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({ setState }) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //Set Errors
    if (
      !data.get("email") ||
      !data.get("password") ||
      !data.get("firstName") ||
      !data.get("lastName")
    ) {
      if (!data.get("email")) {
        setHelperText((prevState) => ({
          ...prevState,
          email: "email must include",
        }));
        setError(true);
      }
      if (!data.get("password")) {
        setHelperText((prevState) => ({
          ...prevState,
          password: "password must include",
        }));
        setError(true);
      }
      if (!data.get("firstName")) {
        setHelperText((prevState) => ({
          ...prevState,
          firstName: "firstName must include",
        }));
        setError(true);
      }
      if (!data.get("lastName")) {
        setHelperText((prevState) => ({
          ...prevState,
          lastName: "lastName must include",
        }));
        setError(true);
      }
    } else {
      setHelperText((prevState) => ({
        ...prevState,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }));
      console.log("Data", data);
      // console.log(
      //   data.get("email"),
      //   data.get("password"),
      //   data.get("firstName"),
      //   data.get("lastName")
      // );
    }
  };

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSignIn = () => {
    setState("SignIn");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            ml={3}
            mr={3}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={Logo} sx={{ m: 1 }} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <FormControl sx={{ m: 3 }} error={error} variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                    <FormHelperText>{helperText.firstName}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                    <FormHelperText>{helperText.lastName}</FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <FormHelperText>{helperText.email}</FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    <FormHelperText>{helperText.password}</FormHelperText>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </FormControl>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => handleSignIn()}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          <div className="signImage">
            <img src={LoginPng} alt="" />
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
