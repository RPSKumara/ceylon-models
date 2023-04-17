import React, { useEffect, useState } from "react";
import { customAlert, db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  Box,
  Modal,
  Fade,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function RequestHandling() {
  const [albumsCount, setAlbumsCount] = useState([]);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [albumCount, setAlbumCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "albums-count"));
      const citiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbumsCount(citiesData);
    };
    fetchData();
  }, []);
  const handleOpen = (imageUrl) => {
    setPreviewImage(imageUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAlbumCount = (email) => {
    if (albumCount <= 0) {
      customAlert("Please increase album count", "warning");
      return;
    }
    try {
      const countRef = doc(db, "albums-count", email);
      updateDoc(countRef, {
        count: increment(albumCount),
        account_number: "",
        request_count: "",
        imageUrl:"",
      });
      customAlert("Album Count Increased", "sucess");
    } catch (error) {
      customAlert(`${error.message}`, "error");
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="tableHeader">Email</TableCell>
            <TableCell className="tableHeader">Account Number</TableCell>
            <TableCell className="tableHeader">Created Albums</TableCell>
            <TableCell className="tableHeader">Total Albums</TableCell>
            <TableCell className="tableHeader">Requested Albums</TableCell>
            <TableCell className="tableHeader">Slip</TableCell>
            <TableCell className="tableHeader">Album Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albumsCount.map(
            (count) =>
              count.account_number && (
                <TableRow key={count.id}>
                  <TableCell>{count.id}</TableCell>
                  <TableCell>{count.account_number}</TableCell>
                  <TableCell>{count.total_albums}</TableCell>
                  <TableCell>{count.count}</TableCell>
                  <TableCell>{count.request_count}</TableCell>
                  <TableCell>
                    <Box
                      className="previewBox"
                      onClick={() => handleOpen(count.imageUrl)}
                    >
                      <Avatar
                        title="Click to preview"
                        className="previewImage"
                        alt={count.id}
                        src={count.imageUrl}
                        variant="square"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="nowrap" alignItems="center">
                      <TextField
                        type="number"
                        value={albumCount}
                        onChange={(e) => setAlbumCount(e.target.value)}
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAlbumCount(count.id)}
                        size="small"
                      >
                        Set
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box className="paper">
            <Box className="closeButtonContainer">
              <IconButton onClick={handleClose}>
                <CloseIcon className="closeButton" fontSize="large" />
              </IconButton>
            </Box>
            <img
              className="previewImageModal"
              src={previewImage}
              alt="Preview"
            />
          </Box>
        </Fade>
      </Modal>
    </TableContainer>
  );
}

export default RequestHandling;
