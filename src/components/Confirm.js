import React from 'react';
import { Link } from 'react-router-dom';

const Confirm = (props) => {
    return (
        <div>
            <h3>Confirm page</h3>
            <p>Thank you for your order.....Your order has been placed....</p>

            <button><Link to="/">Continue shopping more items.....</Link></button>
        </div>
    );
};

export default Confirm;