import React, { useState } from "react";
import {
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth, customAlert } from "../../firebaseConfig";
import Compressor from "compressorjs";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
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
export default function AddArticles() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    type: "Modal's",
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

    // Compress the images
    const compressedFiles = [];
    const options = {
      maxWidth: 800, // Max width of the compressed image
      maxHeight: 800, // Max height of the compressed image
      quality: 0.8, // Compression quality (0 to 1)
      success(result) {
        compressedFiles.push(result);
      },
      error(err) {
        console.log(err.message);
      },
    };

    files.forEach((file) => {
      new Compressor(file, options);
    });

    // Wait for all the images to be compressed before setting the state
    setTimeout(() => {
      setFormData({ ...formData, images: compressedFiles });
    }, 1000);
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
          type: formData.type,
          comments: [],
          photoURL: user.photoURL,
        })
          .then(() => {
            customAlert("Article added successfully", "success");
            const countRef = doc(db, "albums-count", `${user.email}`);
            // Atomically increment the count of the count by 1.
            updateDoc(countRef, {
              total_albums: increment(1),
            });
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
          <Typography variant="h2" align="center" fontWeight="bold">
            Create article
          </Typography>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Article Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={formData.type}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"Salon's"}>Salon's</MenuItem>
              <MenuItem value={"Photographer's"}>Photographer's</MenuItem>
              <MenuItem value={"Hotel's"}>Hotel's</MenuItem>
              <MenuItem value={"Fashion Designer's"}>
                Fashion Designer's
              </MenuItem>
              <MenuItem value={"Modal's"}>Modal's</MenuItem>
              <MenuItem value={"Visitor's"}>Visitor's</MenuItem>
              <MenuItem value={"Other's"}>Other's</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item container xs={12} sm={6}>
          {/* image */}
          <label
            htmlFor="image-input"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {formData.images.length > 0 ? (
              formData.images.map((image) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Article Preview"
                  key={image.name}
                  style={{ maxWidth: "40%", marginBottom: "1rem" }}
                />
              ))
            ) : (
              <Button
                variant="contained"
                component="span"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
