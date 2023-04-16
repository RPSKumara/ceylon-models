import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import React from "react";
import { customAlert, db, storage } from "../../firebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteArticle({ id, imageUrls,email }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        // Delete the article document from Firestore
        await deleteDoc(doc(db, "Articles", id)).then(() => {
          const countRef = doc(db, "albums-count", `${email}`);
          // Atomically increment the count of the count by 1.
          updateDoc(countRef, {
            total_albums: increment(-1),
          });
        });

        // Delete all images from Firebase Storage
        for (const imageUrl of imageUrls) {
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);
        }

        // Show success message
        customAlert("Article deleted successfully", "success");
      } catch (error) {
        // Show error message
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
