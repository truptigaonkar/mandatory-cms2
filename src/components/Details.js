import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';

const Details = (props) => {
    const [product, setProduct] = useState([]);
    const { id } = props.match.params;
    //Cart Reference: https://www.youtube.com/watch?v=hhAT0CJDWqM
    const [cart, setCart] = useContext(CartContext);
    //Items to be added
    const [itemToBeAdded, setItemsToBeAdded] = useState("");

    // componentDidMount() without hook
    useEffect(() => {
        axios.get(`http://192.168.99.102:8085/api/collections/get/products/Case?&filter[_id]=${id}`).then(response => {
            console.log(response.data.entries);
            setProduct(response.data.entries[0]);
        })
    }, [id])

     //Cart: function addToCart Reference: https://www.youtube.com/watch?v=hhAT0CJDWqM
     const addToCart = () => {
        console.log("Button Add to cart clicked");
        const cartItem = { 
            "id": product._id,
            "name": product.name,
            "price": product.price,
            // "amount": product.stock_amount
            "amount": itemToBeAdded
        };
        setCart(currentState => [...currentState, cartItem]);
        window.history.back();
    }
    return (
        <div>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            
            <h3>{product.name} Details: </h3>
            <p>{product.description}</p>
            <p>Price: {cart.length * product.price}</p>
            <p>Stock: {product.stock_amount}</p>
            <input defaultValue="0" style={{width: "50px"}} onChange={e => setItemsToBeAdded(e.target.value)} type="number" />
            <button onClick={addToCart}>Add To Cart</button><hr/>
            <p><button><Link to="/">Back to list</Link></button></p>
        </div>
    );
};

export default Details;