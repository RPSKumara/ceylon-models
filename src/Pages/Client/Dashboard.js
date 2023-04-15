import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { auth, logout } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AppBar,
  Avatar,
  BottomNavigationAction,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

function Dashboard() {
  const [user, { emailVerified, photoUrl }] = useAuthState(auth);
  const isLargeScreen = useMediaQuery("(min-width: 960px)");
  const iconSize = isLargeScreen ? 40 : 25;

  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {user.photoURL && (
              <IconButton>
                <Avatar alt="" src={user.photoURL} />
              </IconButton>
            )}
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
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
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink exact to="/dashboard" smooth>
                    <Typography textAlign="center">Home</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink exact to="/dashboard/create-albums" smooth>
                    <Typography textAlign="center">Create Albums</Typography>
                  </NavLink>
                </MenuItem>
                {emailVerified ? (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink exact to="/dashboard/request-handling" smooth>
                      <Typography textAlign="center">
                        Request Handling
                      </Typography>
                    </NavLink>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink exact to="/dashboard/payment" smooth>
                      <Typography textAlign="center">Payment</Typography>
                    </NavLink>
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink exact to="/dashboard/setting" smooth>
                    <Typography textAlign="center">Setting</Typography>
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  alignItems: "center",
                  color: "white",
                },
              }}
            >
              <NavLink
                style={{ flexGrow: 1, color: "white" }}
                exact
                to="/dashboard"
                smooth
              >
                <IconButton color="inherit">
                  <HomeIcon style={{ fontSize: iconSize }} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    Home
                  </Typography>
                </IconButton>
              </NavLink>
              <NavLink
                style={{ flexGrow: 1, color: "white" }}
                exact
                to="/dashboard/create-albums"
                smooth
              >
                <IconButton color="inherit">
                  <AddBoxIcon style={{ fontSize: iconSize }} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    Add Album
                  </Typography>
                </IconButton>
              </NavLink>
              {emailVerified ? (
                <NavLink
                  style={{ flexGrow: 1, color: "white" }}
                  exact
                  to="/dashboard/request-handling"
                  smooth
                >
                  <IconButton color="inherit">
                    <BorderColorIcon style={{ fontSize: iconSize }} />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      Request Handling
                    </Typography>
                  </IconButton>
                </NavLink>
              ) : (
                <NavLink
                  style={{ flexGrow: 1, color: "white" }}
                  exact
                  to="/dashboard/payment"
                  smooth
                >
                  <IconButton color="inherit">
                    <PaidIcon style={{ fontSize: iconSize }} />
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      Payment
                    </Typography>
                  </IconButton>
                </NavLink>
              )}
              <NavLink
                style={{ flexGrow: 1, color: "white" }}
                exact
                to="/dashboard/setting"
                smooth
              >
                <IconButton color="inherit">
                  <SettingsIcon style={{ fontSize: iconSize }} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    Setting
                  </Typography>
                </IconButton>
              </NavLink>
              <IconButton onClick={() => logOut()} color="inherit">
                <ExitToAppIcon style={{ fontSize: iconSize }} />
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  LogOut
                </Typography>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="space-album" />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Dashboard;
