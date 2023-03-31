import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { auth, customAlert, logout } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { sendEmailVerification } from "firebase/auth";
function Dashboard() {
  const [{ emailVerified, email, displayName }] = useAuthState(auth);
  console.log(emailVerified);
  const isLargeScreen = useMediaQuery("(min-width: 960px)");
  const iconSize = isLargeScreen ? 40 : 25;
  const margin = isLargeScreen ? "0% 15%" : "1% 1%";
  const navWidth = isLargeScreen ? "55%" : "90%";
  const verify = () => {
    sendEmailVerification(auth.currentUser);
    customAlert("email sent", "success");
  };

  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <p>User Email : {email}</p>
        <p>Name : {displayName}</p>
        {emailVerified && <p>Verified Email</p>}
        <Button variant="contained" onClick={() => verify()}>
          Verify Email
        </Button>
        <br />
        <br />
        <Button variant="contained" color="warning" onClick={logout}>
          Log Out
        </Button>
        
        <Outlet />
        <BottomNavigation
          style={{
            width: navWidth,
            margin: margin,
            position: "fixed",
            display: "flex",
            justifyContent: "space-around",
            bottom: "1rem",
            backgroundColor: "RGB(64, 64, 64)",
            borderRadius: "25px 25px 25px 25px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <NavLink exact to="/dashboard" smooth>
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon style={{ color: "white", fontSize: iconSize }} />}
            />
          </NavLink>
          <NavLink exact to="/dashboard/create-albums" smooth>
            <BottomNavigationAction
              label="Add Album"
              icon={
                <AddBoxIcon style={{ color: "white", fontSize: iconSize }} />
              }
            />
          </NavLink>
          {emailVerified ? (
            <NavLink exact to="/dashboard/request-handling" smooth>
              <BottomNavigationAction
                label="Request Handling"
                icon={
                  <BorderColorIcon
                    style={{ color: "white", fontSize: iconSize }}
                  />
                }
              />
            </NavLink>
          ) : (
            <NavLink exact to="/dashboard/payment" smooth>
              <BottomNavigationAction
                label="Payment"
                icon={
                  <PaidIcon style={{ color: "white", fontSize: iconSize }} />
                }
              />
            </NavLink>
          )}
          <NavLink exact to="/dashboard/setting" smooth>
            <BottomNavigationAction
              label="Setting"
              icon={
                <SettingsIcon style={{ color: "white", fontSize: iconSize }} />
              }
            />
          </NavLink>
        </BottomNavigation>
      </Container>
    </>
  );
}

export default Dashboard;
