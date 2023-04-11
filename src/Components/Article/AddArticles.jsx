import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth, customAlert } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Grid, LinearProgress, TextField } from "@mui/material";

export default function AddArticles() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 8) {
      customAlert("You can upload a maximum of 8 images", "warning");
      return;
    }

    setFormData({ ...formData, images: files });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.images.length) {
      customAlert("Please fill all the fields", "warning");
      return;
    }

    const imageUploadPromises = formData.images.map((image) => {
      const storageRef = ref(storage, `/images/${Date.now()}${image.name}`);

      const uploadImage = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const progressPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progressPercent);
          },
          (err) => {
            reject(err);
          },
          () => {
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
              resolve(url);
            });
          }
        );
      });
    });

    Promise.all(imageUploadPromises)
      .then((urls) => {
        const articleRef = collection(db, "Articles");
        addDoc(articleRef, {
          title: formData.title,
          description: formData.description,
          imageUrls: urls,
          createdAt: Timestamp.now().toDate(),
          createdBy: user.displayName,
          userId: user.uid,
          likes: [],
          comments: [],
        })
          .then(() => {
            customAlert("Article added successfully", "success");
            setFormData({
              title: "",
              description: "",
              images: [],
            });
            setProgress(0);
          })
          .catch((err) => {
            customAlert(`${err.message}`, "error");
          });
      })
      .catch((err) => {
        customAlert(`${err.message}`, "error");
      });
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
            {formData.images.length > 0 ? (
              formData.images.map((image) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Article Preview"
                  key={image.name}
                  style={{ maxWidth: "100%", marginBottom: "1rem" }}
                />
              ))
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
            multiple
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
