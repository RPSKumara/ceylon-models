import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPng from "../images/ForgotPassword.png";
import Logo from "../images/Logo/Logo01.png";
import { customAlert, sendPasswordReset } from "../firebaseConfig";
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

export default function ForgotPassword({ setState }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email")) {
      setHelperText("Please enter the email");
      setError(true);
    } else {
      sendPasswordReset(data.get("email"));
      customAlert("Password reset email sent, check email", "success");
    }
  };
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
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <FormHelperText>{helperText}</FormHelperText>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send Reset Link
                </Button>
              </FormControl>
              <Grid container justifyContent="center">
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
