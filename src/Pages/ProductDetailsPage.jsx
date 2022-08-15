import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartAction } from '../actions/userAction';
const ProductDetails = () => {

    const [qty, setQty] = React.useState(1);
    const [detail, setDetail] = React.useState(null);

    const dispatch = useDispatch();
    const { cart, id } = useSelector(({ userReducer }) => {
        return {
            cart: userReducer.cart,
            id: userReducer.id,
        }
    })

    console.log('ini cart', cart);

    const { state, search } = useLocation();
    const navigate = useNavigate();
    const toast = useToast()

    console.log(state);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        Axios.get(API_URL + `products${search}`)
            .then(res => {
                console.log(res.data);
                setDetail(res.data[0]);
            }).catch(err => {
                console.log(err);
            })
    }


    const onInc = () => {
        console.log(state.stock);
        if (qty < state.stock) {
            let count = qty + 1;
            setQty(count);
        }
    };

    const onDec = () => {
        if (qty > 1) {
            let count = qty - 1;
            setQty(count);
        }
    };

    const onBuy = () => {
        let temp = [...cart];
        // 1. Memriksa apakah product sudah ada didalam keranjang
        let idx = temp.findIndex(val => val.idProduct == state.id);

        if (idx >= 0) {
            temp[idx].qty += qty;
        } else {
            // 2. Menambahkan data product kedalam data keranjang sebelumnya
            temp.push({
                idProduct: state.id,
                images: state.images,
                name: state.name,
                brand: state.brand,
                category: state.category,
                stock: state.stock,
                price: state.price,
                qty
            })
        }

        //  2. Melakukan update data ke db.json
        Axios.patch(API_URL + `/users/${id}`, { cart: temp })
            .then(res => {
                //  3. Melakukan update data lg ke reducer
                dispatch(updateCartAction(res.data.cart))
                //  4. redicrect ke cart page/add notif
                toast({
                    title: "Item has been added",
                    description: ``,
                    duration: 3000,
                    status: "success",
                    isClosable: true,
                    position: 'top'
                })
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <div className='container-fluid' >
                <div className='container py-5'>
                    <div className='container bg-white row py-5' style={{}}>
                        <div className='col-12 col-md-7 mb-4'>
                            <img className='shadow rounded' src={API_URL + state.images} alt="product" style={{ width: "600px" }} />
                        </div>

                        <div className=' col-12 col-md-5'>
                            <h6 className='display-6 fw-bold text-muted' >{state.name}</h6>
                            <hr />
                            <p className='fw-bold text-black mt-2' style={{ fontSize: '32px' }}>Rp.{state.price.toLocaleString('id')},-</p>

                            <h6 className='display-6 fw-bold text-muted mt-5 '>About This Product</h6>
                            <hr />
                            <p className='fw-bold mt-1'>Brand :</p>
                            <p className='mb-1 '>{state.brand}</p>
                            <p className='fw-bold mt-1'>Category :</p>
                            <p className='mb-1 '>{state.category}</p>
                            <p className='fw-bold '>Description :</p>
                            <p className='mb-1'>{state.description}</p>
                            <p className='fw-bold text-muted my-3'>Available stock : {state.stock}</p>

                            <hr />
                            <div className='row'>
                                <p className='text-center my-4 col-8'><button className='btn btn-warning w-100 rounded-pill' onClick={onBuy}>Add to cart</button></p>

                                <div className='col-4 my-4 '>
                                    <button className='btn btn-primary rounded-pill' type='button' onClick={onDec}>-</button>
                                    <span className='fw-bold px-2'>{qty}</span>
                                    <button className='btn btn-primary rounded-pill' type='button' onClick={onInc}>+</button>
                                </div>
                            </div>

                            <hr />

                            <p className='fw-bold text-primary mt-2' onClick={() => navigate('/products',)}>Get others product here!</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails;