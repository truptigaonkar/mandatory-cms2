import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';

const Checkout = () => {
    //Cart
    const [cart, setCart] = useContext(CartContext);

    const handleCheckout = () =>{
        setCart([]);
    }

    return (
        <div>
            <h3>Checkout form</h3>
            Name: <input type="text" onChange={e => setCart(e.target.value)} /><br/>
            Address: <textarea name="" id="" cols="30" rows="10" onChange={e => setCart(e.target.value)}></textarea><br/>
            <button onClick={handleCheckout}><Link to="/confirm">Submit</Link></button>
        </div>
    );
};

export default Checkout;