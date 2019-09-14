import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { CartContext } from '../components/CartContext';
import Navbar from '../components/Navbar';

const Home = (props) => {
    const [products, setProducts] = useState([]);
    //Pagination (Reference: https://www.youtube.com/watch?v=IYCa1F-OWmk)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    //Search (Reference: https://discourse.getcockpit.com/t/search-itens-by-term/70/3)
    const [search, setSearch] = useState("");
    //Checkbox
    const [checkbox, setCheckbox] = useState(false);
    //Cart
    const [cart, setCart] = useContext(CartContext);

    // componentDidMount() without hook
    //console.log(checkbox);
    useEffect(() => {
        Axios.get(`http://192.168.99.102:8085/api/collections/get/products?filter[name][$regex]=${search}${checkbox ?"&filter[stock_amount]=true" : "" }`)
            .then(response => {
                console.log(response.data.entries);
                setProducts(response.data.entries);
            })
    }, [search, checkbox])

    //Pagination: Get current article 
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
            <Navbar />
            <h4>Product list</h4>
            <p><input type="text" placeholder="Search product by name..." onChange={e => setSearch(e.target.value)} value={search} /></p>
            <p><input type="checkbox" onChange={e => setCheckbox(!checkbox)} checked={checkbox} /> Show only products in stock ({products.length})</p>
            {/* {products.map((product) => ( */}
            {currentPosts.map((product) => (
                <div className="parent" key={product._id}>
                    <div className="child">
                        <h6><Link to={`/details/${product._id}`}>{product.name}</Link></h6>
                        <p>{<img src={"http://192.168.99.102:8085/" + product.images[0].path} alt="image" width="200px" />}</p>
                        <p>{product.price}$</p>
                        <p>{product.stock_amount} in stock</p>
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