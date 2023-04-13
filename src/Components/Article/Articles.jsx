import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link, json } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import ImageGallery from "../Public/ImageGallery";

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
            imageUrl,
            imageUrls,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <Grid item key={id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      He
                    </Avatar>
                  }
                  title={createdBy && `${createdBy}`}
                  subheader={
                    createdAt && `${createdAt.toDate().toDateString()}`
                  }
                />
                <Link to={`/dashboard/article/${id}`}>
                  <ImageGallery images={imageUrls} />
                </Link>
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                  {comments && comments.length > 0 && (
                    <>
                      <Typography variant="body2" color="text.secondary">
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
                <CardActions disableSpacing>
                  {user && <LikeArticle id={id} likes={likes} />}
                  {likes?.length} likes
                  {user && user.uid === userId && (
                    <DeleteArticle id={id} imageUrl={imageUrl} />
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        )
      )}
    </Grid>
  );
}
