import {  
  ImageList,
  ImageListItem,  
  Paper,
  Typography,
} from "@mui/material";
import React,{ useState } from "react";

const ImageGallery = ({ images }) => { 
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <Paper>
      <ImageList>
        {" "}
        {isModalOpen ? (
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
                  {`+${images.length - 3}`}
                </Typography>
              </ImageListItem>
            ))}
          </>
        ) : (
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
        )}
      </ImageList>
    </Paper>
  );
};

export default ImageGallery;
