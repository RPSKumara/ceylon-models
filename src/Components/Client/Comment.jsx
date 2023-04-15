import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Avatar, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
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
          photoURL: currentlyLoggedUser.photoURL,
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
  const [moreComment, setMoreComment] = useState(false);
  return (
    <>
      <TableContainer>
        <Table className="comment-table">
          <TableBody>
            {comments !== null &&
              (moreComment
                ? comments.map(
                    ({
                      commentId,
                      user,
                      comment,
                      userName,
                      createdAt,
                      photoURL,
                    }) => (
                      <TableRow key={commentId} className="comment">
                        <TableCell>
                          {photoURL ? (
                            <Avatar
                              alt={`${photoURL}`}
                              aria-label="recipe"
                              src={photoURL}
                            />
                          ) : (
                            <>{userName}</>
                          )}
                        </TableCell>
                        <TableCell>{comment}</TableCell>
                        <TableCell>
                          {createdAt.toDate().toDateString()}
                        </TableCell>
                        <TableCell>
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
                                  photoURL,
                                })
                              }
                            >
                              <DeleteIcon className="delete-icon" />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )
                : comments
                    .slice(Math.max(comments.length - 3, 0))
                    .map(
                      ({
                        commentId,
                        user,
                        comment,
                        userName,
                        createdAt,
                        photoURL,
                      }) => (
                        <TableRow key={commentId} className="comment">
                          <TableCell>
                            {photoURL ? (
                              <Avatar
                                alt={`${photoURL}`}
                                aria-label="recipe"
                                src={photoURL}
                              />
                            ) : (
                              <>{userName}</>
                            )}
                          </TableCell>
                          <TableCell>{comment}</TableCell>
                          <TableCell>
                            {createdAt.toDate().toDateString()}
                          </TableCell>
                          <TableCell>
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
                                    photoURL,
                                  })
                                }
                              >
                                <DeleteIcon className="delete-icon" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="caption"
        onClick={() => setMoreComment(!moreComment)}
        className="view-more"
      >
        {moreComment ? "view less" : "view more.."}
      </Typography>
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
    </>
  );
}
