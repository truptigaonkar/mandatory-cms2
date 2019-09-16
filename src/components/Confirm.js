import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavbarComp';
import { Button, Alert, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Confirm = (props) => {
    return (
        <div>
            <Navbar /><br />
            <div className="container">
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a"><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a"><Link to="">Details</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a"><Link to="/cart">Cart</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Confirmation Page</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="emptyPage">
                <Alert color="success">
                    <b>YOUR ORDER HAS BEEN RECEIVED.</b>
                    <p>Thank you for the purchase</p>
                </Alert>
                <p><Link to="/"><Button color="primary">Continue shopping</Button></Link></p>
            </div>
        </div>
    );
};

export default Confirm;