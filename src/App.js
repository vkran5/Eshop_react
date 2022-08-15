import React from 'react';
import './App.css';
import NavbarComponents from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProductsPage from './Pages/ProductsPages';
import ProductCatalog from './Pages/ProductCatalog';
import ProductDetails from './Pages/ProductDetailsPage';
import ShopingCart from './Pages/CartPage';
import NotFoundPage from './Pages/notFoundPages';
import TransactionData from './Pages/transactionPage';
import Footer from './Components/Footer';
import Axios from 'axios';
import { API_URL } from './helper';
import { Routes, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/userAction'
import VerificationPage from './Pages/verificationPage';

function App() {

  const dispatch = useDispatch();
  const { role, username } = useSelector(({ userReducer }) => {
    return {
      role: userReducer.role,
      username: userReducer.username
    }
  })

  const { token } = useParams();

  const keepLogin = () => {
    let eshopLog = localStorage.getItem('eshopLog');
    if (eshopLog) {
      Axios.get(API_URL + `/auth/keep`, {
        headers: {
          'Authorization': `Bearer ${eshopLog}`
        }
      })
        .then((res) => {
          if (res.data.iduser) {
            console.log(res.data.iduser);
            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token
            dispatch(loginAction(res.data));
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    keepLogin()
  }, []);

  return (
    <div>
      <NavbarComponents/>
      <Routes>
        <Route path='/' element={<LandingPage />} /> 
        <Route path= '/verification/:token' element={<VerificationPage token={token} />} /> 
        {
          role ? null :
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </>
        }
        {
          role == 'Admin' &&
          <>
            <Route path='/products/admin' element={<ProductsPage />} />

          </>
        }
        <Route path='/products' element={<ProductCatalog />} />
        <Route path='/products/details' element={<ProductDetails />} />
        <Route path='/cart' element={<ShopingCart />} />
        <Route path='/transactions' element={<TransactionData />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
