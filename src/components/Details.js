import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios'

const Details = (props) => {
    const [product, setProduct] = useState([]);
    const { id } = props.match.params;

    // componentDidMount() without hook
    useEffect(() => {
        axios.get(`http://192.168.99.102:8085/api/collections/get/products/Case?&filter[_id]=${id}`).then(response => {
            console.log(response.data.entries);
            setProduct(response.data.entries[0]);
        })
    }, [id])

    return (
        <div>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            
            <h3>{product.name} Details: </h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock_amount}</p>
        </div>
    );
};

export default Details;