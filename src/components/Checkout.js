import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import Navbar from './NavbarComp';
import { Link } from 'react-router-dom';
import { Button, CardHeader, CardBody, Card, CardText, Input, Row, Col, Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const Checkout = (props) => {
    //Cart
    const [cart, setCart] = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    //Order
    const [newOrderName, setNewOrderName] = useState("");
    const [newOrderAddress, setNewOrderAddress] = useState("");
    const [newOrderTotalPrice, setNewOrderTotalPrice] = useState(0);
    //Validation message
    const [errorMessage, setErrorMessage] = useState("");

    // componentDidMount() without hook
    useEffect(() => {
        //Checking order list
        axios.get(`${API_URL}/api/collections/get/order`).then(response => {
            console.log(response.data.entries);
            setOrders(response.data.entries);
        })

        //Calculating total price
        const totalPrice = cart.reduce((acc, curr) => acc + (Number(curr.price * curr.amount)), 0);
        setNewOrderTotalPrice(totalPrice)

    }, [cart])

    //Checkout button function to add order in cockpit
    const handleCheckout = (e) => {
        e.preventDefault();
        if (!newOrderName || !newOrderAddress) {
            setErrorMessage("You must fill all the details...");
            setTimeout(() => { setErrorMessage('') }, 2000); //above message will disappear after 2000sec.
        } else {
            axios.post(`${API_URL}/api/collections/save/order/`, {
                data: {
                    name: newOrderName,
                    address: newOrderAddress,
                    total_price: newOrderTotalPrice,
                    //product_list: cart.value, //Without prouduct_list(name,amount,price)
                    product_list: cart.map(x => ({ value: x })) //Listing prouduct_list(name,amount,price)
                }
            })
                .then(response => {
                    console.log("Create order entry:", response.data);
                    setOrders([...orders, response.data]);
                    props.history.push("/confirm"); //Redirecting to cart
                })
            window.localStorage.removeItem('shopping-cart');
            console.log(cart);
            setCart([]); // After checkout, cart becomes empty
            // inputs becomes empty
            setNewOrderName([]);
            setNewOrderAddress([]);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container"><br />
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a"><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a"><Link to="/cart">Cart</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Checkout</BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    <Col xs="4">
                    {/* Product_list */}
            <h5>Items to be purchase:</h5>
            <Table size="sm" bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((productList) => (
                        <>
                            <tr key={productList._id}>
                                <td>{productList.name}</td>
                                <td>{productList.amount}</td>
                                <td>{productList.price}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table></Col>
                    <Col xs="8">

                    
            
                        <Card style={{ margin: '20px', textAlign: 'center' }} >
                            <CardHeader><h4>Checkout form</h4></CardHeader>
                            <CardBody>
                                <CardText>
                                    <p style={{ color: 'red' }}>{errorMessage}</p>
                                    <Input type="text" placeholder="Name..." onChange={e => setNewOrderName(e.target.value)} value={newOrderName} required /><br />
                                    <Input type="textarea" placeholder="Address..." onChange={e => setNewOrderAddress(e.target.value)} value={newOrderAddress} required /><br />
                                    <Button color="info" size="lg" block onClick={handleCheckout}>SEND</Button>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row><hr />
                <p style={{ float: 'left' }}><Link to="/"><Button color="primary" size="sm"><i class="fa fa-arrow-left" aria-hidden="true"></i> CONTINUE SHOPPING</Button></Link></p>
            </div>

        </>
    );

};

export default Checkout;