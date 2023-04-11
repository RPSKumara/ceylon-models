import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import LikeArticle from "./LikeArticle";
import Comment from "./Comment";
import ImagesMap from "./ImagesMap";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div>
      {article && (
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title={article.createdBy && `${article.createdBy}`}
            subheader={
              article.createdAt &&
              `${article.createdAt.toDate().toDateString()}`
            }
          />
          <ImagesMap images={article.imageUrls} />
          <CardContent>
            <Typography gutterBottom variant="h4" color="text.primary">
              {article.title}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {article.description}
            </Typography>
          </CardContent>
          <div>
            <div className="likes">
              {user && <LikeArticle id={id} likes={article.likes} />}
              <div>
                <p>{article.likes.length}</p>
              </div>
            </div>
            {/* comment  */}
            <Comment id={article.id} />
          </div>
        </Card>
      )}
    </div>
  );
}
