import React from 'react';
import Axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { useDispatch } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";
import { logoutAction } from '../actions/userAction';
import {
    Avatar,
    AvatarBadge,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    Button
} from '@chakra-ui/react'

const NavbarComponents = (props) => {

    const { pathname } = window.location;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const { username, role, email, status, cart } = useSelector((state) => {
        return {
            username: state.userReducer.username,
            status: state.userReducer.status,
            role: state.userReducer.role,
            email: state.userReducer.email,
            password: state.userReducer.password,
            cart: state.userReducer.cart,
        }
    })

    const onLogout = () => {
        Axios.get(API_URL + `/auth/all?email=${email}`)
            .then((res) => {
                localStorage.removeItem('eshopLog');
                dispatch(logoutAction(res.data));
                navigate('/login', { replace: true });
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className={`navbar navbar-expand-lg 
        ${pathname == '/' || pathname == '/register' || pathname == '/login' ?
                'navbar-dark bg-transparent position-absolute w-100' :
                'navbar-light position-absolute w-100'
            } `}>
            <div className='container'>
                <span className='navbar-brand' onClick={() => navigate('/')}>
                    <span className='fw-bold'>
                        E-SHOP
                    </span>

                    <span className='lead ms-1'>
                        | Furniture
                    </span>
                </span>

                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#eshop-navbar' aria-controls='eshop-navbar' aria-expanded='false'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='eshop-navbar'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li>
                            <span className='nav-link' onClick={() => navigate('/products')}>
                                Products
                            </span>
                        </li>
                    </ul>
                    <div className='d-flex'>
                        {
                            props.loading ?
                                <div className='btn-group'>
                                    <MoonLoader color={'#ffff'} size={32} />
                                </div>
                                :
                                username && !props.loading ?
                                        <div className='d-flex align-items-center'>
                                            <Menu className='pe-5'>
                                                <MenuButton>
                                                    <div className='d-flex align-items-center'>
                                                        <p className={`fst-italic me-3 ${pathname == '/' || pathname == '/register' || pathname == '/login' ?
                                                            'text-white' : 'text-black'}`}
                                                            style={{ fontSize: '24px' }}>
                                                            {status}
                                                        </p>

                                                        <Avatar as={Button} name={username} size='md' bg='teal.500'>
                                                            <AvatarBadge boxSize='1em' bg='green.500' />
                                                        </Avatar>
                                                    </div>
                                                </MenuButton>
                                                {
                                                    role == 'Admin' ?
                                                        <MenuList className='menu-drop'>
                                                            <MenuGroup>
                                                                <MenuItem className='text-muted' onClick={() => navigate('products/admin')}>Product Management</MenuItem>
                                                                <MenuItem className='text-muted'>Transaction Management</MenuItem>
                                                            </MenuGroup>

                                                            <MenuGroup>
                                                                <MenuItem onClick={onLogout} className="fw-bold text-danger">Log Out <FaSignOutAlt className='ms-3' /></MenuItem>
                                                            </MenuGroup>
                                                        </MenuList>
                                                        :
                                                        <MenuList className='menu-drop'>
                                                            <MenuGroup>
                                                                <MenuItem className='text-muted'>Profile </MenuItem>
                                                                <MenuItem className='text-muted' onClick={()=> navigate('/transactions')}>Transactions </MenuItem>
                                                                <MenuItem className='text-muted' onClick={()=> navigate('/cart')}>Cart <Badge>{cart.length}</Badge></MenuItem>
                                                            </MenuGroup>
                                                            <hr style={{ color: 'rgb(205, 203, 203)' }} />
                                                            <MenuGroup>
                                                                <MenuItem onClick={onLogout} className="fw-bold text-danger">Log Out <FaSignOutAlt className='ms-3' /></MenuItem>
                                                            </MenuGroup>
                                                        </MenuList>
                                                }
                                            </Menu>
                                        </div>
                                    :
                                    <div className='btn-group'>
                                        <button className='btn btn-outline-light' type='button'
                                            onClick={() => navigate('/login')}
                                        >
                                            Sign In
                                        </button>
                                        <button className='btn btn-primary'
                                            type='button'
                                            onClick={() => navigate('/register')}>
                                            Sign Up
                                        </button>
                                    </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponents;