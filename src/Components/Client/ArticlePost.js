import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import ImageGallery from "../Public/ImageGallery";
import Comment from "./Comment";
import LikeArticle from "./LikeArticle";
import DeleteArticle from "./DeleteArticle";
import { red } from "@mui/material/colors";

export default function ArticlePost(props) {
  return (
    <Grid item>
      <Card>
        <CardHeader
          avatar={
            props.photoURL ? (
              <Avatar aria-label="recipe" src={props.photoURL} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: red[500],
                }}
                aria-label="recipe"
              >
                CM
              </Avatar>
            )
          }
          title={props.createdBy && `${props.createdBy}`}
          subheader={
            props.createdAt && `${props.createdAt.toDate().toDateString()}`
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h4" color="text.primary">
            {props.title}
            {props.type && (
              <span
                style={{
                  fontWeight: "700",
                }}
              >
                #{props.type}
              </span>
            )}
          </Typography>
          <ImageGallery images={props.imageUrls} />
          <Typography variant="h6" color="text.primary">
            {props.description}
          </Typography>
          {props.comments && props.comments.length > 0 && (
            <>
              <Typography
                sx={{
                  textAlign: "right",
                }}
                variant="body2"
                color="text.secondary"
              >
                {props.comments?.length} comments
              </Typography>
            </>
          )}
          <Comment id={props.id} />
        </CardContent>
        <CardActions disableSpacing>
          {props.user && <LikeArticle id={props.id} likes={props.likes} />}
          {props.likes?.length} likes
          {props.user && props.user.uid === props.userId && (
            <DeleteArticle
              id={props.id}
              imageUrls={props.imageUrls}
              email={props.user.email}
            />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
