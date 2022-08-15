import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { API_URL } from '../helper';
import {useParams, useNavigate} from 'react-router-dom';
import { loginAction } from '../actions/userAction';
import {useDispatch} from 'react-redux';
import axios from 'axios';


const VerificationPage = (prop) => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Verify = async () => {
        console.log(params.token);
        try {
            let res = await axios.patch(`${API_URL}/auth/verify`, {} , {
                headers: {
                    'Authorization' : `Bearer ${params.token}`
                }
            })

            console.log(res.data);

            if (res.data.success) {
                localStorage.setItem('eshopLog', res.data.dataLogin.token);
                delete res.data.dataLogin.token;
                dispatch(loginAction(res.data.dataLogin));
                navigate('/', {replace: true})
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div id='login-page' className='py-5 background'>
            <div className='container'>
                <div className='bg-white shadow rounded mx-auto mt-5 p-4' style={{ width: '400px' }}>
                    <p className='ps-5 ms-3 mb-4 text-primary' style={{ fontSize: '200px' }}><AiFillCheckCircle /></p>
                    <div className='ms-3'>
                        <button className='btn btn-primary ms-5' onClick={Verify}>VERIFY YOUR ACCOUNT</button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default VerificationPage