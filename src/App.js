import "./App.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Home = lazy(() => import("./Pages/Home"));
// Album and About pages are include inside home page
const About = lazy(() => import("./Pages/About"));
const Album = lazy(() => import("./Pages/Album"));

//For the Login or Register users
const UserCredential = lazy(() => import("./Pages/UserCredential"));

//After Login Users
const Dashboard = lazy(() => import("./Pages/Dashboard"));

//When url does not exit
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />}>
            <Route index element={<Album />}></Route>
            <Route path="about-us" element={<About />}></Route>
          </Route>
          <Route path="/login" element={<UserCredential />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
