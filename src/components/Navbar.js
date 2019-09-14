import React, {useContext} from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    //Cart
    const [cart] = useContext(CartContext);
    return (
        <>
        <div><Link to="/"><button>Home</button></Link>
        <span style={{float:"right", fontSize:"15px"}}><Link to="/cart">Shopping Cart({cart.length})</Link></span></div>
        </>
    );
};

export default Navbar;