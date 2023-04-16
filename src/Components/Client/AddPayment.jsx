import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, customAlert, db, storage } from "../../firebaseConfig";
import { useState } from "react";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function AddPayment() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    account_number: "",
    request_count: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (
      !formData.account_number ||
      !formData.request_count ||
      !formData.image
    ) {
      customAlert("Please fill all the fields", "warning");
      return;
    }

    const storageRef = ref(storage, `/albums-count/${user.email}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          account_number: "",
          request_count: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const countRef = doc(db, "albums-count", `${user.email}`);
          // Atomically increment the count of the count by 1.
          updateDoc(countRef, {
            imageUrl: url,
            account_number: formData.account_number,
            request_count: formData.request_count,
          })
            .then(() => {
              customAlert("Article added successfully", "success");
              setProgress(0);
            })
            .catch((err) => {
              customAlert(`${err.message}`, "error");
            });
        });
      }
    );
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Upload Payment Receipt</h2>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Account Number */}
          <TextField
            label="Account Number"
            variant="outlined"
            margin="normal"
            name="account_number"
            value={formData.account_number}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
          {/* Request Count */}
          <TextField 
            label="Request Count"
            variant="outlined"
            margin="normal"
            name="request_count"
            value={formData.request_count}
            onChange={(e) => handleChange(e)}
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* image */}
          <label htmlFor="image-input">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Article Preview"
                style={{ maxWidth: "50%" }}
              />
            ) : (
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            )}
          </label>
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            style={{ display: "none" }}
          />
          {progress === 0 ? null : (
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePublish}
            fullWidth
          >
            Publish
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
