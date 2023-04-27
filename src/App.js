import "./App.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = lazy(() => import("./Pages/Public/Home"));
// Album and About pages are include inside home page
const About = lazy(() => import("./Pages/Public/About"));
const Album = lazy(() => import("./Pages/Public/Album"));

//For the Login or Register users
const UserCredential = lazy(() => import("./Pages/Public/UserCredential"));

//After Login Users
const Dashboard = lazy(() => import("./Pages/Client/Dashboard"));

//For users
const ViewAlbums = lazy(() => import("./Pages/Client/ViewAlbums"));
const Setting = lazy(() => import("./Pages/Client/Setting"));
const Payment = lazy(() => import("./Pages/Client/Payment"));
const CreateAlbums = lazy(() => import("./Pages/Client/CreateAlbums"));
const RequestHandling = lazy(() => import("./Pages/Client/RequestHandling"));

//When url does not exit
const PageNotFound = lazy(() => import("./Pages/Public/PageNotFound"));
function App() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />}>
            <Route index element={<Album />}></Route>
            <Route path="about-us" element={<About />}></Route>
            <Route path="specific-post" element={<Album />}></Route>
          </Route>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <UserCredential />}
          >
            <Route index element={<ViewAlbums />}></Route>
            <Route path="create-albums" element={<CreateAlbums />}></Route>
            <Route path="setting" element={<Setting />}></Route>
            <Route path="payment" element={<Payment />}></Route>
            <Route
              path="request-handling"
              element={<RequestHandling />}
            ></Route>
            <Route path="about-us" element={<About />}></Route>
          </Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
