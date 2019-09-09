import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const [cart, setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
    console.log("component Cart.js:", cart);

    return (
        <>
            <span>Cart Items: {cart.length}</span>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(cartItem =>
                            (
                                <tr>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.price}</td>
                                   
                                </tr> 
                            )) 
                    }
                </tbody>
            </table>
            <span>Total price : {totalPrice}</span><hr/>
            <p><button><Link to="/">Continue shopping</Link></button>  <button>Checkout</button></p>
        </>
    );
};

export default Cart;