import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { Link } from 'react-router-dom';
import Navbar from './NavbarComp';
import { Button, CardHeader, CardBody, Card, CardFooter, Badge, Table, Row, Col, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';

const Cart = (props) => {
    const [cart, setCart] = useContext(CartContext);
    const totalPrice = cart.reduce((acc, curr) => acc + (Number(curr.price * curr.amount)), 0);

    const handleEmptyCart = () => {
        window.localStorage.removeItem('shopping-cart');
        setCart([]);
    }

    if (cart.length === 0) {
        return (
            <>
                <Navbar /><br />
                <div className="emptyPage">
                    <Alert color="danger">
                        <b>Cart is empty</b>
                    </Alert>

                    <p><Link to="/"><Button color="primary">Continue shopping</Button></Link></p>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className="container"><br />
                    {/* <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a"><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a"><Link to="">Details</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Cart</BreadcrumbItem>
                </Breadcrumb> */}
                    <Row>
                        <Col sm="12" md={{ size: 10, offset: 1 }}>
                            <Card style={{ margin: '20px', textAlign: 'center' }} >
                                <CardHeader><h4>Cart Items <Badge color="secondary">{cart.length}</Badge></h4></CardHeader>
                                <CardBody>
                                    <Table size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Price By Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((cartItem, index) =>
                                                    (
                                                        <tr key={cartItem._id}>
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{cartItem.name}</td>
                                                            <td>{cartItem.price} SEK</td>
                                                            <td>{cartItem.amount}</td>
                                                            <td>{cartItem.price * cartItem.amount} SEK</td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </Table><hr />

                                    <span><b>Total price</b> : {totalPrice} SEK</span>
                                </CardBody>
                                <CardFooter>
                                    <Button color="danger" onClick={handleEmptyCart}>Empty Cart</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row><hr />
                    <p><Link to="/"><Button color="primary">Continue shopping</Button></Link> <Link to="/checkout"><Button color="primary" style={{ float: 'right' }}>Checkout</Button></Link></p>
                </div>
            </>
        );
    };
}
export default Cart;