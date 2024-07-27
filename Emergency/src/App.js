import React from "react";
import MapComponent from "./components/MapComponent";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
const App = () => (
  <div>
    <Routes className="App">
        <Route path="/" element={<Homepage/>} />
        <Route path="/map" element={<MapComponent />} />
    </Routes>
  </div>
);

export default App;