import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import Navbar from './NavbarComp';
import { Row, Col, Badge, Input, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Details = (props) => {
    const [product, setProduct] = useState([]);
    const { id } = props.match.params;
    //Cart Reference: https://www.youtube.com/watch?v=hhAT0CJDWqM
    const [cart, setCart] = useContext(CartContext);
    //Items to be added
    const [itemToBeAdded, setItemsToBeAdded] = useState(1);
    //Disable addToCart button with stock_amount = 0
    const addToCartBtnEnabled = product.stock_amount > 0;

    // componentDidMount() without hook
    useEffect(() => {
        axios.get(`http://192.168.99.102:8085/api/collections/get/products/Case?&filter[_id]=${id}`).then(response => {
            console.log(response.data.entries);
            setProduct(response.data.entries[0]);
        })
    }, [id])

    //Cart: function addToCart Reference: https://www.youtube.com/watch?v=hhAT0CJDWqM
    const addToCart = () => {
        const cartItem = {
            "id": product._id,
            "name": product.name,
            "price": product.price,
            // "amount": product.stock_amount
            "amount": itemToBeAdded
        };

        
        //localstorage: If there is no shopping cart in local storage, create one else, add a new object
        let shoppingCart;
        let localStorage = window.localStorage.getItem('shopping-cart');
        if (localStorage === null) {
            shoppingCart = [];
        }
        else {
            shoppingCart = JSON.parse(localStorage);
        }
        //Convert to JSON and save in local storage
        shoppingCart = [...shoppingCart, cartItem];
        let jsonString = JSON.stringify(shoppingCart);
        window.localStorage.setItem('shopping-cart', jsonString);
        localStorage = window.localStorage.getItem('shopping-cart');
        console.log('localStorage: ', localStorage);


        setCart(currentState => [...currentState, cartItem]);
        //window.history.back(); //Redirecting to previous page
        props.history.push("/cart"); //Redirecting to cart
    }
    // Show the gallary images
    let images = []
    if (product.images) {
        images = product.images.map(image => {
            return <img src={"http://192.168.99.102:8085/" + image.path} width="400px" height="400px" />;
        });
    }

    return (
        <div>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Navbar />
            <div className="container"><br />
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a"><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">{product.name} Details</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    <Col xs="4"><br />
                        {/* Show the ga<br/>llary images */}
                        <p>{images}</p></Col>
                    <Col xs="8"><br /><h5>{product.name}</h5><hr />
                        <b>Price: {product.price} SEK</b>
                        <p>Availability: In Stock <Badge color="secondary">{product.stock_amount}</Badge></p><hr />
                        <p>{product.description}</p><hr />
                        <div className="addToBtn"><Input value={itemToBeAdded} min={1} max={product.stock_amount} onChange={e => setItemsToBeAdded(e.target.value)} type="number" style={{ width: "75px" }} />
                            <Button color="info" disabled={!addToCartBtnEnabled} onClick={addToCart}>Add To Cart</Button></div><hr />

                        <Reviews id={id} /></Col>
                </Row>
            </div>
        </div>
    );
};

export default Details;