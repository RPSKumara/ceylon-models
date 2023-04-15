import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Edit from "@mui/icons-material/Edit";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, customAlert } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { Grid, IconButton } from "@mui/material";

export default function EditDisplayName() {
  const [{ displayName }] = useAuthState(auth);
  const [name, setName] = useState(displayName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        customAlert("Profile updated successfully!", "success");
      })
      .catch((error) => {
        customAlert(`Error updating profile: ${error.message}`, "error");
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(displayName);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            label={isEditing ? "Edit Display Name" : "Display Name"}
            value={name}
            onChange={handleInputChange}
            disabled={!isEditing}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          {isEditing ? (
            <IconButton onClick={handleConfirmClick}>
              <Check />
            </IconButton>
          ) : (
            <IconButton onClick={handleEditClick}>
              <Edit />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={6} sm={2}>
          {isEditing && (
            <IconButton onClick={handleCancelClick}>
              <Close />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
}
