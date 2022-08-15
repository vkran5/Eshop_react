import React from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import { API_URL } from '../helper';

const TransactionData = (props) => {

    const [transactData, setTransactData] = React.useState([])
    const [toggle, setToggle] = React.useState(false);

    console.log('ini data transact', transactData);

    React.useEffect(() => {
        getTransactions()
    }, [])

    const getTransactions = () => {
        Axios.get(API_URL + `/transactions`)
            .then(res => {
                console.log(res.data);
                setTransactData(res.data)
            }).catch(err => {
                console.log(err);
            })
    }

    const printDetail = (idTransaction) => {
        let index = transactData.findIndex(val => val.id == idTransaction)

        return transactData[index].detail.map(value => {
            return (
                <div className='row'>
                    <div className='col-2'>
                        <img src={value.images} alt="product" style={{ width: '120px' }} />
                    </div>

                    <div className='col-4 ms-4'>
                        <p className='text-muted fw-bold'>{value.name}</p>
                        <p className='text-muted'>{value.qty} Items</p>
                    </div>

                    <div className='col-5'>
                        <p className='text-muted fw-bold text-end'>Rp. {(value.qty * value.price).toLocaleString('id')},-</p>
                    </div>
                </div>
            )
        })
    }

    const printTransactions = () => {
        let display = transactData.map(val => {
            return (
                <div id='transactions component'>
                    <div className='transaction border shadow w-75 mx-auto p-3 my-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <span className='text-muted fw-bold mx-2'>{val.invoice}</span>
                                <span className='text-muted mx-2'>{val.date}</span>
                            </div>

                            <div className='col-6 pb-2'>
                                <p className='fw-bold text-end text-primary'>{val.status}</p>
                            </div>
                        </div>
                        <hr className='mx-auto my-2' />

                        <div className='row'>
                            <div className='col-2'>
                                <img src={val.detail[0].images} alt="product" style={{ width: '120px' }} />
                            </div>

                            <div className='col-10'>
                                <p className='text-muted fw-bold'>Total Payment</p>
                                <p className='fw-bold'>Rp. {(val.total_price + val.ongkir).toLocaleString('id')},-</p>

                                <p className='text-muted fw-bold mt-3'>Dark Sofa</p>
                                <p className='text-muted'>{val.detail.length} Items</p>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-6'>
                            </div>

                            <div className='col-6 text-end'>
                                <button className='btn btn-primary mx-2' type='button' onClick={() => setToggle(!toggle)}>See Details</button>
                                <button className='btn btn-danger mx-2' type='button' >Cancel Order</button>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Transaction details :</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='text-muted'>{val.invoice}</p>
                                            <p className='text-muted'>Transaction Date</p>

                                        </div>

                                        <div className='col-6 pb-2'>
                                            <p className='fw-bold text-end text-primary'>{val.status}</p>
                                            <p className='text-end text-muted'> {val.date}</p>
                                        </div>
                                    </div>
                                    <hr className='mx-auto my-2' />

                                    <p className='fw-bold text-muted my-3'>Detail Product :</p>

                                    <div id='detail-items'>
                                        <div className=' my-2'>
                                            {
                                                printDetail(val.id)
                                            }
                                        </div>
                                    </div>


                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <p className='fw-bold text-primary'>Total:</p>

                                        </div>

                                        <div className='col-5 ms-4'>
                                            <p className='fw-bold text-bold text-end'>Rp. {val.total_price.toLocaleString('id')},-</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div id='expedition'>
                                        <p className='text-muted fw-bold my-3'>Shipping Information :</p>

                                        <div className='row'>
                                            <p className='col-6 text-primary fw-bold '>{val.shipping}</p>

                                            <p className='col-5 text-end ms-3 fw-bold'>Rp. {val.ongkir.toLocaleString('id')},-</p>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className='row my-3'>
                                        <p className='text-primary fw-bold col-6'>Total Payment</p>
                                        <p className='fw-bold col-5 text-end ms-3'>Rp. {(val.total_price + val.ongkir).toLocaleString('id')},-</p>

                                    </div>

                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <button className='btn btn-primary mx-2'>Buy</button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            )
        })

        return display;
    }


    return (
        <div>
            <div className='container pt-5'>
                <div id='transactions' className='pt-4'>
                    {
                        printTransactions()
                    }
                </div>

            </div>
        </div>
    )
}

export default TransactionData;