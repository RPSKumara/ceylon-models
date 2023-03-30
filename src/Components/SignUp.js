import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LoginPng from "../images/SignUp.png";
import Logo from "../images/Logo/Logo01.png";

import TextField from "@mui/material/TextField";

import {
  Button,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
  Typography,
  Link,
  Box,
  Grid,
  Paper,
  CssBaseline,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { customAlert, registerWithEmailAndPassword } from "../firebaseConfig";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data.password);

    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regExp.test(data.password)) {
      setPasswordError(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
    } else if (
      regExp.test(data.password) &&
      data.confirm_password !== data.password
    ) {
      setPasswordError("Password must match");
    } else {
      setPasswordError("");
      registerWithEmailAndPassword(data.email, data.password);
    }
  };

  const handleSignIn = () => {
    setState("SignIn");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
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
            <Box sx={{ mt: 3 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      {...register("firstName", {
                        required: "First Name is required.",
                      })}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      name="lastName"
                      {...register("lastName", {
                        required: "Last Name is required.",
                      })}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      error={Boolean(passwordError) || Boolean(errors.password)}
                      helperText={passwordError || errors.password?.message}
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      {...register("confirm_password", {
                        required: "Confirm Password is required",
                      })}
                      error={Boolean(errors.confirm_password)}
                      helperText={errors.confirm_password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className="icon"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* Check box */}
                  <Grid item xs={12}>
                    <FormGroup
                      error={Boolean(errors.tnc)}
                      style={{ display: "block", marginTop: "17px" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="tnc"
                            {...register("tnc", {
                              required: "please aggre our terms and condtions",
                            })}
                          />
                        }
                        label="I aggree all terms and conditions"
                      />
                    </FormGroup>
                    <FormHelperText style={{ color: "#d32f2f" }}>
                      {errors.tnc?.message}
                    </FormHelperText>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  create new account
                </Button>
              </form>
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
