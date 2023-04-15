import { ImageList, ImageListItem, Paper } from "@mui/material";
import React from "react";

const ImagesMap = ({ images }) => {
  return (
    <Paper>
      <ImageList>
        <>
          {images.map((url, index) => (
            <ImageListItem key={index}>
              <img
                src={`${url}?w=248&fit=crop&auto=format`}
                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`Images ${index}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Paper>
  );
};

export default ImagesMap;
