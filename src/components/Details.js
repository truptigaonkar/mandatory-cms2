import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios'

const API_URL_product = "http://192.168.99.102:8085/api/collections/get/products";

const Details = (props) => {
    const [product, setProduct] = useState([]);
    const { id } = props.match.params;

    useEffect(() => {
        axios.get(API_URL_product + `/Case?&filter[_id]=${id}`).then(response => {
        // axios.get(`http://192.168.99.102:8085/api/collections/get/products/Case?&filter[_id]=${id}`).then(response => {
            console.log(response.data.entries);
            setProduct(response.data.entries[0]);
        })
    }, [id])

    return (
        <div>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock_amount}</p>
        </div>
    );
};

export default Details;