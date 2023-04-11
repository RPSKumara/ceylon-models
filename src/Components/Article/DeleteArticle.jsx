import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { customAlert, db, storage } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        customAlert("Article deleted successfully", "success");        
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        customAlert(`${error.message}`, "error");        
      }
    }
  };
  return (
    <div>
      <IconButton onClick={handleDelete} sx={{ cursor: "pointer" }}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
