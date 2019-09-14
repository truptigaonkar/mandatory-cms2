import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import Reviews from './components/Reviews';
import Checkout from './components/Checkout';
import Confirm from './components/Confirm';

function App() {
  return (
    <>
    <CartProvider>
    <Router>
    {/* <ul>
      <li><Link to="/">Home</Link></li>
    </ul> */}
      <Route exact path="/" component={Home}/>
      <Route path="/details/:id" component={Details}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/reviews" component={Reviews}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="/confirm" component={Confirm}/>
    </Router>
    </CartProvider>
    </>
  );
}

export default App;
