import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import Navbar from './NavbarComp';
import { Link } from 'react-router-dom';
import { Button, CardHeader, CardBody, Card, CardText, Input, Row, Col } from 'reactstrap';

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
        axios.get(`http://192.168.99.102:8085/api/collections/get/order`).then(response => {
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
            axios.post(`http://192.168.99.102:8085/api/collections/save/order/`, {
                data: {
                    name: newOrderName,
                    address: newOrderAddress,
                    total_price: newOrderTotalPrice,
                    product_list: cart.value,
                }
            })
                .then(response => {
                    //console.log("Create order entry:", response.data);
                    setOrders([...orders, response.data]);
                    props.history.push("/confirm"); //Redirecting to cart
                })
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
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <Card style={{ margin: '20px', textAlign: 'center' }} >
                            <CardHeader><h4>Checkout form</h4></CardHeader>
                            <CardBody>
                                <CardText>
                                    <p style={{ color: 'red' }}>{errorMessage}</p>
                                    <Input type="text" placeholder="Name..." onChange={e => setNewOrderName(e.target.value)} value={newOrderName} required /><br />
                                    <Input type="textarea" placeholder="Address..." onChange={e => setNewOrderAddress(e.target.value)} value={newOrderAddress} required /><br />
                                    <Button color="info" onClick={handleCheckout}>SEND</Button>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row><hr />
                <p style={{float:'right'}}><Link to="/"><Button color="primary">Continue shopping</Button></Link></p>
            </div>
        </>
    );
};

export default Checkout;