import { Avatar, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ImageGallery from "./ImageGallery";

export default function PostBody(props) {
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
        <Typography gutterBottom variant="h4" color="text.primary">
          {props.title}{" "}
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
        <CardContent>
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
          <TableContainer>
            <Table className="comment-table">
              <TableBody>
                {props.comments &&
                  props.comments
                    .slice(Math.max(props.comments.length - 3, 0))
                    .map((com, index) => (
                      <TableRow key={index} className="comment">
                        <TableCell>
                          {com.photoURL ? (
                            <Avatar aria-label="recipe" src={com.photoURL} />
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
  );
}