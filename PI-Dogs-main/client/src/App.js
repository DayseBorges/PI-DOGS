import './App.css';
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/0LandingPage/LandingPage"
import Home from "./components/2Home/Home"


function App() {
  return (
    <BrowserRouter>
      <div className="App">

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
