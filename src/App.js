import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';

function App() {
  return (
    <>
    <Router>
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/details/:id" component={Details}/>
    </Router>
    </>
  );
}

export default App;
