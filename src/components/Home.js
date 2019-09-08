import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Home = () => {
    const [products, setProducts] = useState([]);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    // componentDidMount() without hook
    useEffect(() => {
        Axios.get("http://192.168.99.102:8085/api/collections/get/products").then(response => {
            console.log(response.data.entries);
            setProducts(response.data.entries);
        })
    }, [])

     //Pagination: Get current article (Reference: https://www.youtube.com/watch?v=IYCa1F-OWmk)
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
 
     //Pagination: Change page
     const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (!products) {
        return <p>Loading product......</p>
    }

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <h3>Product list</h3>
            {/* {products.map((product) => ( */}
            {currentPosts.map((product) => (
                <div className="parent" key={product._id}>
                    <div className="child">
                        <h6><Link to={`/details/${product._id}`}>{product.name}</Link></h6>
                        <p>{<img src={"http://192.168.99.102:8085/" + product.images[0].path} alt="image" width="250px" />}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
            ))}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={products.length}
                paginate={paginate}
            />
        </div>
    );
};

export default Home;