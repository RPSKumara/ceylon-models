import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "../Client/LikeArticle";

import { red } from "@mui/material/colors";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ImageGallery from "../Public/ImageGallery";
import Comment from "./Comment";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
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
              createdAt,
              createdBy,
              userId,
              likes,
              comments,
              photoURL,
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
                  <CardContent>
                    <Typography gutterBottom variant="h4" color="text.primary">
                      {title}
                    </Typography>
                    <ImageGallery images={imageUrls} />
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
                    <Comment id={id} />
                  </CardContent>
                  <CardActions disableSpacing>
                    {user && <LikeArticle id={id} likes={likes} />}
                    {likes?.length} likes
                    {user && user.uid === userId && (
                      <DeleteArticle
                        id={id}
                        imageUrls={imageUrls}
                        email={user.email}
                      />
                    )}
                  </CardActions>
                </Card>
              </Grid>
            )
          )
        )}
      </Grid>
    </Container>
  );
}
