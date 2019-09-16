import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavbarComp';
import { Button, Alert } from 'reactstrap';

const Confirm = (props) => {
    return (
        <div>
            <Navbar />
            <div className="emptyPage">
                    <Alert color="success">
                        <b>Thank you for your order.....Your order has been placed....</b>
                    </Alert>
                    <p><Link to="/"><Button color="primary">Continue shopping</Button></Link></p>
                </div>
        </div>
    );
};

export default Confirm;