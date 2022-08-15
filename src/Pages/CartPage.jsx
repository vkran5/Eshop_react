import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartAction, checkoutAction } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';


const ShopingCart = () => {
    const [cartData, setCartData] = React.useState([]);
    const [ongkir, setOngkir] = React.useState(0);
    const [selectedShipping, setSelectedShipping] = React.useState(null);
    const [shipping, setShipping] = React.useState([
        {
            id: 1,
            type: 'Reguler',
            pay: 0.05
        },
        {
            id: 2,
            type: 'Next Day',
            pay: 0.075
        },
        {
            id: 3,
            type: 'Same Day',
            pay: 0.1
        }

    ]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, cart, transaction } = useSelector(({ userReducer }) => {
        return {
            id: userReducer.id,
            cart: userReducer.cart,
            transaction: userReducer.transaction
        }
    })

    console.log('ini cart', cartData);
    console.log('ini transaction', transaction);

    React.useEffect(() => {
        getData();
    }, [])

    // const toast = useToast()

    const getData = () => {
        Axios.get(API_URL + `/users/` + id)
            .then(res => {
                console.log('data acces', res.data.cart)
                console.log(res.data);
                setCartData(res.data.cart)
            }).catch(err => {
                console.log(err);
            })
    }

    const printCart = () => {

        let display = cartData.map((val, idx) => {
            return (
                <tr>
                    <td className='d-flex align-middle' key={val.id}>
                        <div className='mx-2'>
                            <img src={val.images} alt="" style={{ width: "150px" }} />
                        </div>

                        <div className='mx-2'>
                            <p className='fw-bold my-2'>{val.name}</p>
                            <p className='text-primary fw-bold my-2'>{val.brand}</p>
                            <p className='text-muted my-2' style={{ cursor: 'pointer' }} onClick={() => onRemove(val.idProduct)}>Remove</p>
                        </div>
                    </td>
                    <td className='align-middle'>
                        <button className='btn btn-sm ' onClick={() => onDec(val.idProduct)} >-</button>
                        <span className='border fw-bold text-muted mx-3 py-1 px-2'>{val.qty}</span>
                        <button className='btn btn-sm ' onClick={() => onInc(val.idProduct)} >+</button>
                    </td>
                    <td className='align-middle'>Rp. {val.price.toLocaleString('id')},-</td>
                    <td className='align-middle'>Rp. {(val.price * val.qty).toLocaleString('id')}-</td>
                </tr>
            )
        })
        return display;
    }

    const printShipping = () => {
        return shipping.map(val => <option key={val.id} value={val.id}> {val.type} - Rp. {(totalProductPay() * val.pay).toLocaleString('id')}</option>)
    }

    console.log(ongkir);
    const onShipping = (idShipping) => {
        console.log(idShipping);
        let select = shipping.filter(val => val.id == idShipping)
        console.log('ini select', select);
        setSelectedShipping(select[0]);
        setOngkir(select[0].pay * totalProductPay());
    }

    const onDec =async (idProduct) => {
        try {
            let temp = [...cartData];
            let idx = temp.findIndex(val => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx]
            }

            if (newData.qty > 1) {
                newData.qty -= 1
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await Axios.patch(API_URL + `/users/${id}`, {
                    cart: temp
                })

                console.log(newData.qty);
                dispatch(updateCartAction(resPatch.data.cart));
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onInc = async (idProduct) => {
        try {
            let temp = [...cartData];
            let idx = temp.findIndex(val => val.idProduct == idProduct);
            // Menampung data object berdasarkan index yang dipilih
            let newData = {
                ...temp[idx]
            }

            let resGet = await Axios.get(API_URL + `/products?id=${idProduct}`)
            if (newData.qty < resGet.data[0].stock) {
                newData.qty += 1
                // temp.splice(idx, 1, newData); //Cara 1
                temp[idx] = newData; // Cara 2

                let resPatch = await Axios.patch(API_URL + `/users/${id}`, {
                    cart: temp
                })

                console.log(newData.qty);
                dispatch(updateCartAction(resPatch.data.cart));
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRemove = (idProduct) => {
        let temp = [...cartData];
        let idx = temp.findIndex(val => val.idProduct === idProduct);

        temp.splice(idx, 1);

        Axios.patch(API_URL + '/users/' + id, { cart: temp })
            .then(res => {
                console.log(res.data.cart);
                dispatch(updateCartAction(res.data.cart));
                getData();
            }).catch(err => {
                console.log(err);
            })
    }

    const onCheckOut =async () => {
        try {
            // Menyiapkan data base
            // Hal yang harus disimpan, idUser, invoice, date, total_price, shipping, totalPayment, detail transaksi, status.
            let date = new Date()
            let data = {
                idUser: id,
                invoice: `INV/${date.getTime()}`,
                date: date.toDateString(),
                total_price: totalProductPay(),
                shipping: selectedShipping.type,
                ongkir,
                detail : cartData,
                status: 'UNPAID'
            }


            let resPost = await Axios.post(API_URL + '/transactions', data)
            if (resPost.data.id) {
                // redirect ke page transaction
                await Axios.patch(API_URL + '/users/' + id, {cart: []})
                dispatch(updateCartAction([]))
                //  Data cart user direset ulang
                navigate('/transactions')

            }
        } catch (error) {
            console.log(error);
        }
    }

    const totalProductPay = () => {
        let total = 0;
        cartData.forEach((val) => {
            total += val.price * val.qty
        })

        return total;
    }

    return (
        <div>
            <div className='container-fluid pt-3'>
                <div className='container py-5'>
                    <div className='row py-3 '>
                        <div className='col-8 mx-2 py-4'>
                            <h4 className='fw-bold display-6' style={{ fontSize: '24px' }}>Shoping Cart</h4>
                            <hr />

                            <div id="table">
                                <table className="table mt-3 table-borderless ">
                                    <thead className='text-muted'>
                                        <tr>
                                            <th scope="col">Product Detail</th>
                                            <th scope="col">QUANTITY</th>
                                            <th scope="col">PRICE</th>
                                            <th scope="col">TOTAL</th>
                                        </tr>
                                    </thead>

                                    <tbody className="mt-4">
                                        {printCart()}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className='col-3 bg-light p-4 ms-5'>
                            <div>
                                <div>
                                    <h4 className='fw-bold display-6' style={{ fontSize: '24px' }}>Order Summary</h4>
                                </div>
                                <hr />

                                <div className='row mt-4'>
                                    <p className='col-6 fw-bold text-muted'>ITEMS {cartData.length}</p>
                                    <p className='col-6 text-end fw-bold text-muted'>Rp. {totalProductPay().toLocaleString('id')},-</p>
                                </div>

                                <label className='py-4 fw-bold text-muted' for="SHIPPING">SHIPPING</label>
                                <div >
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => onShipping(e.target.value)}>
                                        <option value="" selected>Select Shipping Options</option>
                                        {
                                            printShipping()
                                        }
                                    </select>
                                </div>

                                <div >
                                    <label className='py-4 fw-bold text-muted' for="">PROMO CODE</label>
                                    <input className='form-control' placeholder='Enter your Code' type="text" />
                                </div>

                                <button className='btn btn-primary my-4'>APPLY</button>
                                <hr />

                                <div className='row'>
                                    <p className='text-muted col-6 fw-bold my-4'>TOTAL COST</p>
                                    <p className='col-6 text-end fw-bold text-muted my-4'>Rp. {(totalProductPay() + ongkir).toLocaleString()},-</p>
                                </div>

                                <button className='btn btn-warning w-100' onClick={() => { onCheckOut() }}>CHECKOUT</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopingCart;