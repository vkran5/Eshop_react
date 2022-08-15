import React from 'react';
import Axios from 'axios';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';
import { loginAction, loginMiddleware } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { useToast } from "@chakra-ui/react";

const LoginPage = (prop) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setVisibility] = React.useState("password");
    const [iconPass, setIcon] = React.useState(FaEye);
    const [navbarBtn, setNavbarBtn] = React.useState(FaEye);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const onLogin = async () => {
        let res = await dispatch(loginMiddleware(email, password));
        if (res.success) {
            navigate('/', {replace: true})
        }

        // Axios.post(API_URL + `/auth/login` , {
        //     email,
        //     password
        // })
        //     .then((res) => {
        //         // console.log(res.data);
        //         localStorage.setItem('eshopLog', res.data.token);
        //         delete res.data.token;
        //         dispatch(loginAction(res.data));
        //         navigate('/', { replace: true });
        //     }).catch((err) => {
        //         toast({
        //             title: "Something wrong happened",
        //             description: "Check your email and password",
        //             duration: 3000,
        //             status: "error",
        //             isClosable: true,
        //             position: 'top'
        //         })
        //     })
    }

    const onShowPassword = () => {
        if (showPassword === 'password') {
            setVisibility('text')
            setIcon(FaEyeSlash)
        } else if (showPassword === 'text') {
            setVisibility('password')
            setIcon(FaEye)
        }
    }

    return (
        <div id='login-page' className='py-5 background'>
            <div className='container'>
                <div className='bg-white shadow rounded mx-auto mt-5 p-4' style={{ width: '400px' }}>
                    <div>
                        <h6 className='fw-bold text-muted' style={{ fontSize: '32px' }}>Login for shoping</h6>
                        <p className='text-muted my-2'>Have not account yet? <span className='text-primary fw-bold'>Sign up here</span></p>
                    </div>

                    <div id='form' className='py-2'>
                        <label className="form-label fw-bold text-muted">Email</label>
                        <input className='form-control' type="text" onChange={(e) => { setEmail(e.target.value) }}/>

                        <label className="form-label fw-bold text-muted">Password</label>
                        <div className='input-group'>
                            <input className='form-control ' type={showPassword}onChange={(e) => { setPassword(e.target.value) }} />
                            <span className='input-group-text' onClick={onShowPassword}>
                               {iconPass}
                            </span>
                        </div>

                        <div className='mx-auto pb-4'>
                            <p className='text-muted'>Forgot password <span className='fw-bold text-primary'>Click here!</span></p>
                            <button className='btn btn-primary mt-4 w-100' type='button' onClick={onLogin}>Login</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LoginPage;