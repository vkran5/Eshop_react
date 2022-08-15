import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

const Footer = (props) => {

    return <div className="p-2 bg-light">
        <div className='container d-none d-md-flex flex-wrap justify-content-between mt-5'>
            <div className='navbar-brand btn'>
                <span className='fw-bold text-primary' >
                    E-SHOP
                </span>
                <span className='lead ms-1'>
                    | Furniture
                </span>
            </div>
            <ul style={{ listStyleType: "none" }} className="d-none d-md-block">
                <li><b>Products</b></li>
                <li>Livingroom</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
            </ul>
            <ul style={{ listStyleType: "none" }} className="d-none d-md-block">
                <li><b>Company</b></li>
                <li>About us</li>
                <li>Career</li>
            </ul>
            <div className="d-none d-md-block">
                <b>Follow us</b>
                <div className='d-flex'>
                    <AiFillFacebook size={35} color="#397ef6" />
                    <AiFillInstagram size={35} color="#397ef6" />
                    <AiFillTwitterCircle size={35} color="#397ef6" />
                </div>
            </div>
        </div>
        
        <div className='text-muted text-center'>© All rights reserved.</div>
    </div>
}

export default Footer;