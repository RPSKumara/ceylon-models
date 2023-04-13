import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedUser] = useAuthState(auth);
  const commentRef = doc(db, "Articles", id);
  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedUser.uid,
          userName: currentlyLoggedUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      Comment
      <div className="container">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className="border p-2 mt-2 row">
                <div className="col-11">
                  <span
                    className={`badge ${
                      user === currentlyLoggedUser.uid
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    {userName}
                  </span>
                  {"  "}
                  {comment}
                </div>
                <div className="col-1">
                  {user === currentlyLoggedUser.uid && (
                    <IconButton
                      aria-label="delete comment"
                      size="small"
                      onClick={() =>
                        handleDeleteComment({
                          commentId,
                          user,
                          comment,
                          userName,
                          createdAt,
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        {currentlyLoggedUser && (
          <TextField
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={handleChangeComment}
          />
        )}
      </div>
    </div>
  );
}
