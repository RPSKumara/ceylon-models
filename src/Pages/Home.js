import * as React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../images/Logo/Logo02.png";
function Home() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <div>
      <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Avatar
                alt="Logo"
                src={Logo}
                sx={{
                  width: 56,
                  height: 56,
                  // flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  ml: 5,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "cursive",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Ceylon Models
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem>
                    <NavLink exact to="/" smooth>
                      <Typography textAlign="center">Album</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink exact to="/about-us" smooth>
                      <Typography textAlign="center">About</Typography>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "cursive",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Ceylon Models
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <NavLink exact to="/about-us" smooth>
                  <Button
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    About Us
                  </Button>
                </NavLink>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </>
      <Outlet />
    </div>
  );
}

export default Home;
