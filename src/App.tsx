import React, { useState } from "react";
import Home from "./views/Home/Home";
import Service from "./views/Service/Service";
import About from "./views/About/About";
import Help from "./views/Help/Help";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import NotFound from "./views/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Service" element={<Service />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Help" element={<Help />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
