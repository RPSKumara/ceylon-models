import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, customAlert, db, storage } from "../../firebaseConfig";
import { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Grid, LinearProgress, TextField } from "@mui/material";

export default function AddPayment() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
    if (!formData.title || !formData.description || !formData.image) {
      customAlert("Please fill all the fields", "warning");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

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
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
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
          <h2>Create article</h2>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* title */}
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
          {/* description */}
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            multiline
            rows={4}
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
            <LinearProgress variant="determinate" value={progress} />
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
