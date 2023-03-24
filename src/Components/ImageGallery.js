import {
  Card,
  ImageList,
  ImageListItem,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ImageGallery = ({ itemData }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <Paper>
      <ImageList>        
        {isModalOpen ? (
          <>
            {itemData.slice(0, 3).map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            {itemData.slice(3, 4).map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <Typography
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                  sx={{
                    fontSize: "3rem",
                    textAlign: "center",
                  }}
                  className="centered"
                  variant="subtitle1"
                  gutterBottom
                >
                  {`+ ${itemData.length - 3}`}
                </Typography>
              </ImageListItem>
            ))}
          </>
        ) : (
          <>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </>
        )}
      </ImageList>
    </Paper>
  );
};

export default ImageGallery;
