import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Navbar from './NavbarComp';
import logo from '../logo.png';
import { Badge, Row, Col, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const Home = (props) => {
    const [products, setProducts] = useState([]);
    //Pagination (Reference: https://www.youtube.com/watch?v=IYCa1F-OWmk)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    //Search (Reference: https://discourse.getcockpit.com/t/search-itens-by-term/70/3)
    const [search, setSearch] = useState("");
    //Checkbox
    const [checkbox, setCheckbox] = useState(false);

    // componentDidMount() without hook
    //console.log(checkbox);
    useEffect(() => {
        Axios.get(`${API_URL}/api/collections/get/products?filter[name][$regex]=${search}${checkbox ? "&filter[stock_amount]=true" : ""}`)
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
        <div style={{ textAlign: "center" }}>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div class="topHeader">
                    <div class="shipping-text" style={{float:"center"}} >(+91) 000-1233 <span class="shipping-detail">24/7 Online Support</span></div>
            </div>
            <div class="container">
                <div className="middleHeader">
                    <div><input type="checkbox" onChange={e => setCheckbox(!checkbox)} checked={checkbox} /> In stock <Badge color="secondary">{products.length}</Badge></div>
                    <div><img src={logo} alt="" /></div>
                    <div>
                        <InputGroup>
                            <Input placeholder="Search product by name..." onChange={e => setSearch(e.target.value)} value={search} /><InputGroupAddon addonType="prepend"><Button><i className="fa fa-search"></i></Button></InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </div>

            <Navbar /><br />
            <h4>FEATURED PRODUCTS <Badge color="secondary">{products.length}</Badge></h4><hr />
            {/* {products.map((product) => ( */}
            {currentPosts.map((product) => (
                <div className="parent" key={product._id}>
                    <Row>
                            <Col>
                                <div className="child" style={{marginBottom:'12px'}}>
                                    <p><Link to={`/details/${product._id}`}>{<img src={API_URL + product.images[0].path} alt="image" width="240px" height="250px" />}</Link></p>
                                </div>
                                <h6><Link to={`/details/${product._id}`}>{product.name}</Link></h6>
                                <b>{product.price} SEK</b>
                                {/* <p>{product.stock_amount} in stock</p> */}
                            </Col>
                    </Row>

                </div>
            ))} 
           <hr />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={products.length}
                    paginate={paginate}
                />
            </div><hr />
        </div>
    );
};

export default Home;