import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Container, Grid } from "@mui/material";
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
              createdAt,
              createdBy,
              comments,
            }) => (
              <Grid item key={id}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={createdBy && `${createdBy}`}
                    subheader={
                      createdAt && `${createdAt.toDate().toDateString()}`
                    }
                  />
                  <Link to={`/articles/${id}`}>
                    <ImageGallery images={imageUrls} />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h4" color="text.primary">
                      {title}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                      {description}
                    </Typography>
                    {comments && comments.length > 0 && (
                      <>
                        <Typography
                          sx={{ textAlign:'right'}}
                          variant="body2"
                          color="text.secondary"
                        >
                          {comments?.length} comments
                        </Typography>
                      </>
                    )}

                    {comments &&
                      comments
                        .slice(Math.max(comments.length - 3, 0))
                        .map((com) => (
                          <div className="comment">
                            <p>{com.comment}</p>
                            <p>{com.userName}</p>
                            <p>{com.createdAt.toDate().toDateString()}</p>
                          </div>
                        ))}
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
