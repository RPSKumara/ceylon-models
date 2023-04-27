import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Post from "../../Components/Public/Post";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Album = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSidebars, setShowSidebars] = useState(!isScreenSmall);

  useEffect(() => {
    setShowSidebars(!isScreenSmall);
  }, [isScreenSmall]);

  return (
    <Grid container>
      <>
        {showSidebars && (
          <Grid item xs={12} md={3}>
            <div style={{ textAlign: "center" }}>
              <h1>SideBar</h1>
            </div>
          </Grid>
        )}
        <Grid item xs={12} md={showSidebars ? 6 : 12}>
          <Post type={type} />
        </Grid>
        {showSidebars && (
          <Grid item xs={12} md={3}>
            <div style={{ textAlign: "center" }}>
              <h1>SideBar</h1>
            </div>
          </Grid>
        )}
      </>
    </Grid>
  );
};

export default Album;
