import React from "react";

const ImageList = ({ images }) => {
  return (
    <div>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index}`}
          style={{ maxWidth: "20vw" }}
        />
      ))}
    </div>
  );
};

export default ImageList;
