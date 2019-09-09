import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const [cart, setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + (Number(curr.price*curr.amount)), 0);
    const sum = Number()
    console.log("sum is: ", sum)
    console.log("component Cart.js:", cart);

    return (
        <>
            <span>Cart Items: {cart.length}</span>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Price By Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(cartItem =>
                            (
                                <tr>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.price}$</td>
                                    <td>{cartItem.amount}</td>
                                    <td>{cartItem.price * cartItem.amount}$</td>
                                </tr> 
                            )) 
                    }
                </tbody>
            </table><br/>
            <span><b>Total price</b> : {totalPrice}$</span><hr/>
            <p><button><Link to="/">Continue shopping</Link></button>  <button>Checkout</button></p>
        </>
    );
};

export default Cart;