import { ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import React from "react";

const ImageGallery = ({ images }) => {
  return (
    <Paper>
      <ImageList>
        <>
          {images.slice(0, 3).map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={`${url}?w=248&fit=crop&auto=format`}
                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`Images ${index}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
          {images.slice(3, 4).map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={`${url}?w=248&fit=crop&auto=format`}
                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`Images ${index}`}
                loading="lazy"
              />
              <Typography
                sx={{
                  fontSize: "3rem",
                  textAlign: "center",
                }}
                className="centered"
                variant="subtitle1"
                gutterBottom
              >
                {`+${images.length - 3}`}
              </Typography>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Paper>
  );
};

export default ImageGallery;
