import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Checkout = () => {
    //Cart
    const [cart, setCart] = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    //Order
    const [newOrderName, setNewOrderName] = useState("");
    const [newOrderAddress, setNewOrderAddress] = useState("");
    const [newOrderTotalPrice, setNewOrderTotalPrice] = useState(0);

        // componentDidMount() without hook
        useEffect(() => {
            //Checking order list
            axios.get(`http://192.168.99.102:8085/api/collections/get/order`).then(response => {
                console.log(response.data.entries);
                setOrders(response.data.entries);
            })

            //Calculating total price
            const totalPrice = cart.reduce((acc, curr) => acc + (Number(curr.price * curr.amount)), 0);
            setNewOrderTotalPrice(totalPrice)
       
        }, [])

    //Checkout button function to add order in cockpit
    const handleCheckout = (e) =>{
        e.preventDefault();
        axios.post(`http://192.168.99.102:8085/api/collections/save/order/`, {
            data: {
                name: newOrderName,
                address: newOrderAddress,
                total_price: newOrderTotalPrice,
                product_list: cart.value,
            }
        })
        .then(response => {
            console.log("Create order entry:", response.data);
            setOrders([...orders, response.data]);
        })
        setCart([]); // After checkout, cart becomes empty
    }

    return (
        <div>
            <Navbar />
            <h3>Checkout form</h3>
            Name: <input type="text" placeholder="Name..." onChange={e => setNewOrderName(e.target.value)} value={newOrderName} /><br/>
            Address: <textarea name="" id="" cols="30" rows="3" placeholder="Address..." onChange={e => setNewOrderAddress(e.target.value)} value={newOrderAddress}></textarea><br/>
            <button onClick={handleCheckout}><Link to="/confirm">Submit</Link></button>
        </div>
    );
};

export default Checkout;