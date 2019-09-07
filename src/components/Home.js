import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const API_URL_product = "http://192.168.99.102:8085/api/collections/get/products";

const Home = () => {

    const [products, setProducts] = useState([]);

    // componentDidMount() without hook
    useEffect(() => {
        Axios.get(API_URL_product).then(response => {
            console.log(response.data.entries);
            setProducts(response.data.entries);
        })
    }, [])

    if (!products) {
        return <p>Loading product......</p>
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <h3>Product list</h3>
            {products.map((product) => (

                <div className="parent" key={product._id}>
                    <div className="child">
                        <h6><Link to={`/details/${product._id}`}>{product.name}</Link></h6>
                        <p>{<img src={"http://192.168.99.102:8085/" + product.images[0].path} alt="image" width="100px" />}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;