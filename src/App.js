import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
// 舊版本-v6：import { Switch, Route } from "react-router-dom";
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}
// 舊版本-v6：exact表示其path要完全符合條件；在新版本中，已經默認了 exact 屬性的行為，不須再寫。
export default App;
