import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/header/header.component";
import { useEffect } from "react";
import Home from "./pages/home/home.component";
import { Route, Routes } from "react-router-dom";

function App() {
  //useEffect(); // get all artists and all paintings
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="messages" />
        {/* children go here */}
        <Route path="tasks" />
      </Route>
    </Routes>
  );
}

export default App;
