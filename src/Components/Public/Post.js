import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import ImageGallery from "./ImageGallery";

export default function Post() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {articles.length === 0 ? (
          <Grid item xs={12}>
            <p>No articles found!</p>
          </Grid>
        ) : (
          articles.map(
            ({
              id,
              title,
              description,
              imageUrls,
              photoURL,
              createdAt,
              createdBy,
              comments,
            }) => (
              <Grid item key={id}>
                <Card>
                  <CardHeader
                    avatar={
                      photoURL ? (
                        <Avatar aria-label="recipe" src={photoURL} />
                      ) : (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          CM
                        </Avatar>
                      )
                    }
                    title={createdBy && `${createdBy}`}
                    subheader={
                      createdAt && `${createdAt.toDate().toDateString()}`
                    }
                  />
                  <Typography gutterBottom variant="h4" color="text.primary">
                    {title}
                  </Typography>
                  <ImageGallery images={imageUrls} />
                  <CardContent>
                    <Typography variant="h6" color="text.primary">
                      {description}
                    </Typography>
                    {comments && comments.length > 0 && (
                      <>
                        <Typography
                          sx={{ textAlign: "right" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {comments?.length} comments
                        </Typography>
                      </>
                    )}
                    <TableContainer>
                      <Table className="comment-table">
                        <TableBody>
                          {comments &&
                            comments
                              .slice(Math.max(comments.length - 3, 0))
                              .map((com, index) => (
                                <TableRow key={index} className="comment">
                                  <TableCell>
                                    {com.photoURL ? (
                                      <Avatar
                                        aria-label="recipe"
                                        src={com.photoURL}
                                      />
                                    ) : (
                                      <>{com.userName}</>
                                    )}
                                  </TableCell>
                                  <TableCell> {com.comment}</TableCell>
                                  <TableCell>
                                    {com.createdAt.toDate().toDateString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            )
          )
        )}
      </Grid>
    </Container>
  );
}
