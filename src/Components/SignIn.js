import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Paper,
  Link,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Button,
  Avatar,
  Typography,
  FormGroup,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LoginPng from "../images/Login.png";
import Logo from "../images/Logo/Logo01.png";
import { useForm } from "react-hook-form";
import { customAlert, logInWithEmailAndPassword } from "../firebaseConfig";
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

export default function SignIn({ setState }) {
  const navigate = useNavigate();

  const handleSignUp = () => {
    setState("SignUp");
  };
  const handleForgotPassword = () => {
    setState("FP");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email && data.password) {
      logInWithEmailAndPassword(data.email, data.password);      
    } else {
      customAlert("Something went wrong", "error");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <div className="signImage">
            <img src={LoginPng} alt="" />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={Logo} sx={{ m: 1 }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              form
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{ mt: 2, mb: 2 }}
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                fullWidth
                name="email"
                {...register("email", {
                  required: "E-mail Address is required.",
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <TextField
                sx={{ mt: 2, mb: 2 }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
              />
              <FormGroup
                error={Boolean(errors.tnc)}
                style={{ display: "block", marginTop: "17px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="tnc"
                      {...register("tnc", {
                        required: "please checked remember me",
                      })}
                    />
                  }
                  label="Remember me"
                />
              </FormGroup>
              <FormHelperText style={{ color: "#d32f2f" }}>
                {errors.tnc?.message}
              </FormHelperText>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => handleForgotPassword()}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => handleSignUp()}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
