import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = (props) => {
    const [cart, setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + (Number(curr.price * curr.amount)), 0);
    const sum = Number()
    console.log("sum is: ", sum)
    console.log("component Cart.js:", cart);

    const handleEmptyCart = () =>{
        setCart([]);
    }

    if (cart.length === 0) {
        return (
            <>
                <p>Cart is empty</p>
                <button><Link to="/">Back to list</Link></button>
            </>
        )
    } else {
        return (
            <>
             <Navbar />
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
                </table>
                <span><b>Total price</b> : {totalPrice}$</span><hr />
                <button onClick={handleEmptyCart}>Empty Cart</button><br/>
                <p><button><Link to="/">Continue shopping</Link></button> <button><Link to="/checkout">Checkout</Link></button></p>
            </>
        );
    };
}
export default Cart;