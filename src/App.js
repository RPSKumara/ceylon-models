import "./App.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = lazy(() => import("./Pages/Home"));
// Album and About pages are include inside home page
const About = lazy(() => import("./Pages/About"));
const Album = lazy(() => import("./Pages/Album"));

//For the Login or Register users
const UserCredential = lazy(() => import("./Pages/UserCredential"));

//After Login Users
const Dashboard = lazy(() => import("./Pages/Dashboard"));

//For users
const ViewAlbums = lazy(() => import("./Pages/Client/ViewAlbums"));
const Setting = lazy(() => import("./Pages/Client/Setting"));
const Payment = lazy(() => import("./Pages/Client/Payment"));
const CreateAlbums = lazy(() => import("./Pages/Client/CreateAlbums"));
const RequestHandling = lazy(() => import("./Pages/Client/RequestHandling"));

//When url does not exit
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

const Article = lazy(() => import("./Components/Article/Article"));

function App() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />}>
            <Route index element={<Album />}></Route>
            <Route path="articles/:id" element={<Article />} />
            <Route path="about-us" element={<About />}></Route>
          </Route>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <UserCredential />}
          >
            <Route index element={<ViewAlbums />}></Route>
            <Route path="create-albums" element={<CreateAlbums />}></Route>
            <Route path="setting" element={<Setting />}></Route>
            <Route path="payment" element={<Payment />}></Route>
            <Route path="article/:id" element={<Article />} />
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
