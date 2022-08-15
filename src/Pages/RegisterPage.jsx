import React from 'react';
import Axios from 'axios';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { API_URL } from '../helper'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setVisibility] = React.useState("password")
    const [iconPass, setIcon] = React.useState(FaEye)

    const navigate = useNavigate()
    const toast = useToast();
    const positions = [
        'top',
        'top-right',
        'top-left',
        'bottom',
        'bottom-right',
        'bottom-left',
      ]

    const onRegister = () => {

        Axios.post(API_URL + '/auth/regis', {
            username: username,
            email: email,
            password: password,
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    navigate('/')
                    toast({
                        title: "Account created",
                        description: `Welcome to E-SHOP ${response.data.username}`,
                        duration: 3000,
                        status: "success",
                        isClosable: true,
                        position: 'top'
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
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
        <div>
            <div id='register-page' className='py-4 background'>
                <div id='register-form' className='container bg-white mx-auto mt-5 py-3 row rounded shadow'>
                    <div className='d-none d-md-block col-md-8 pt-4 text-center'>
                        <p className='text-center'><img className='w-75 ms-4' src="https://assets-global.website-files.com/5bcb5ee81fb2091a2ec550c7/627c972960fcbb0e6de798d6_DrawKit%20Webflow%20Grid.png" alt='...' /></p>
                    </div>

                    <div className='col-12 col-md-4 p-2 shadow my-2'>
                        <div className='p-4 '>
                            <p className='fw-bold text-muted'>START FOR FREE</p>
                            <h3>Sign Up to E-SHOP</h3>
                            <span className='text-muted'>Already a member?</span>
                            <span className='text-primary fw-bold'> Sign In</span>

                        </div>

                        <div className='form-site my-4 w-75  mx-auto'>
                            <label className='text-muted fw-bold'>Username</label><br />
                            <input className='form-control' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} defaultValue='' />

                            <label className='text-muted  mt-2 fw-bold'>E-mail</label><br />
                            <div className='input-group'>
                                <input className='form-control' type="text" placeholder='name@mail.com' onChange={(e) => setEmail(e.target.value)} defaultValue='' />
                                <span className='input-group-text text-muted bg-transparent'>@</span>
                            </div>

                            <label className='text-muted mt-2 fw-bold'>Password</label>
                            <div className='input-group'>
                                <input className='form-control' type={showPassword} placeholder='6+ Characters' onChange={(e) => setPassword(e.target.value)} defaultValue='' />
                                <span className='input-group-text text-muted bg-transparent' onClick={onShowPassword}>{iconPass}</span>
                            </div>

                            <button className='btn btn-primary text-center mt-4 w-100 ' onClick={onRegister}>Create Account</button>
                            <button className='btn btn-outline-secondary text-center mt-4 w-100' onClick={()=> window.open(`${API_URL}/auth/google` , '_blank').focus()}><span>Sign up with Google</span> </button>

                            <div className='text-form-footer pt-4 '>
                                <span className='text-primary fw-bold'>Privacy and Policy</span>
                                <span className='text-muted'> and</span>
                                <span className='text-primary fw-bold'> Term of Service</span>
                                <span className='text-muted'> apply</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;
