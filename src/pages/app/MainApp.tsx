import React from "react";
import MyElection from "./myElection/MyElection";
import Navbar from "../navbar/Navbar";

const MainApp = () => {
  return (
    <div className="body">
      <div className="scroll">
        <MyElection />
      </div>
      <Navbar />
    </div>
  );
};

export default MainApp;
