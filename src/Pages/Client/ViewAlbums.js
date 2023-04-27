import React from "react";
import Articles from "../../Components/Client/Articles";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function ViewAlbums() {
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
          <Articles />
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
}

export default ViewAlbums;
