import './App.css';
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/0LandingPage/LandingPage"
import Home from "./components/2Home/Home"
import Create from "./components/8CreateDog/Create"


function App() {
  return (
    <BrowserRouter>
      <div className="App">

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={Create} />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
