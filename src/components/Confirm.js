import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavbarComp';
import { Button, Alert, Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Confirm = (props) => {
    return (
        <div>
            <Navbar /><br />
            <div className="container">
                {/* <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a"><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem tag="a"><Link to="/cart">Cart</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Confirmation Page</BreadcrumbItem>
                </Breadcrumb> */}
            </div>
            <div className="emptyPage" style={{ textAlign: 'center' }}>
                <i class="fa fa-check-circle" aria-hidden="true" style={{ color: 'green', fontSize: '90px' }}></i>
                <p style={{ fontSize: '20px' }}>Order Completed Successfully!</p>
                <p>Thank you for ordering. We received your order and will begin processing it soon.</p>
                <p><Link to="/"><Button color="primary">BACK TO STORE</Button></Link></p>
            </div>
        </div>
    );
};

export default Confirm;