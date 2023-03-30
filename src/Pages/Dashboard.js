import React from "react";
import { auth, logout } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const [user] = useAuthState(auth);
  const user_email = user?.email;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>USers Email : {user_email}</p>
      <div>
        <p onClick={logout}>Log Out</p>
      </div>
    </div>
  );
}

export default Dashboard;
