import React, { useState } from "react";
import CropEasy from "./CropEasy";
import { Avatar, Box, Button, DialogContent, IconButton } from "@mui/material";
import { Crop } from "@mui/icons-material";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { customAlert, storage } from "../../firebaseConfig";

export default function EditProfileImage() {
  const auth = getAuth();
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState();
  const [openCrop, setOpenCrop] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const updateProfilePic = () => {
    if (!file) return;

    // Upload the file to Firebase Storage
    const storageRef = ref(
      storage,
      `users/${auth.currentUser.uid}/profile.jpg`
    );
    uploadBytes(storageRef, file)
      .then(() => {
        // Get the download URL of the uploaded file
        return getDownloadURL(storageRef);
      })
      .then((downloadURL) => {
        // Update the user's profile with the new photo URL
        return updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });
      })
      .then(() => {
        customAlert("Profile updated", "success");
      })
      .catch((error) => {
        customAlert(`${error.message}`, "error");
      });
  };

  return !openCrop ? (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>

          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
          <Button variant="contained" onClick={() => updateProfilePic()}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </form>
  ) : (
    <>
      <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
    </>
  );
}
