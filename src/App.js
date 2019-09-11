import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import Reviews from './components/Reviews';

function App() {
  return (
    <>
    <CartProvider>
    <Router>
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/details/:id" component={Details}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/reviews" component={Reviews}/>
    </Router>
    </CartProvider>
    </>
  );
}

export default App;
