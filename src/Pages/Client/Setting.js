import React from "react";
import EditDisplayName from "../../Components/Client/EditDisplayName";
import { Avatar, Container, Grid } from "@mui/material";
import EditProfileImage from "../../Components/Client/EditProfileImage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

const Setting = () => {
  const [{ photoURL }] = useAuthState(auth);
  return (
    <Container>
      <EditDisplayName />
      <Grid container>
        <Grid item xs={4}>
          <Avatar
            src={photoURL}
            alt="Profile Image"
            sx={{ width: 75, height: 75 }}
          />
        </Grid>
        <Grid item xs={4}>
          <EditProfileImage />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Setting;
