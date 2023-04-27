/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Grid } from "@mui/material";
import ArticlePost from "./ArticlePost";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [numArticles, setNumArticles] = useState(5);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const articleRef = collection(db, "Articles");
    const q = query(
      articleRef,
      orderBy("createdAt", "desc"),
      limit(numArticles)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      setLoading(false);
      console.log(articles);
    });

    return () => unsubscribe();
  }, [numArticles]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setNumArticles(numArticles + 5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
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
              type,
            }) => (
              <ArticlePost
                key={id}
                user={user}
                id={id}
                title={title}
                description={description}
                imageUrls={imageUrls}
                createdAt={createdAt}
                createdBy={createdBy}
                userId={userId}
                likes={likes}
                comments={comments}
                photoURL={photoURL}
                type={type}
              ></ArticlePost>
            )
          )
        )}
        <div ref={bottomRef} />
      </Grid>
    </Container>
  );
}
