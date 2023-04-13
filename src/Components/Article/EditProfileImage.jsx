import React, { useState } from "react";
import CropEasy from "./CropEasy";
import { Avatar, Box, Button, DialogActions, DialogContent, DialogContentText, IconButton, TextField } from "@mui/material";
import { Crop } from "@mui/icons-material";

export default function EditProfileImage() {
   
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
        </Box>
      </DialogContent>      
    </form>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
}
