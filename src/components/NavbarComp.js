import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

const NavbarComp = () => {
    //Cart
    const [cart] = useContext(CartContext);
    return (
        <>
            <Navbar color="dark" light expand="md">
                <div className="container">
                    <Link to="/"><NavbarBrand style={{ color: 'white' }}><button class="btn" style={{ color: 'white', fontSize:'30px' }}><i class="fa fa-home"></i></button></NavbarBrand></Link>
                    {/* Shopping cart, reference: https://codepen.io/chcculle/pen/qPrWBK */}
                    <Link to="/cart">
                        <span class="fa-stack fa-2x has-badge" data-count={cart.length} style={{float:"right", fontSize:'25px'}}>
                            <i class="fa fa-circle fa-stack-2x"></i>
                            <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
                        </span>
                    </Link>
                </div>
            </Navbar>

        </>
    );
};

export default NavbarComp;