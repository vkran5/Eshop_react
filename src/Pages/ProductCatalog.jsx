import React from 'react';
import { Button } from '@chakra-ui/react'
import Axios from 'axios';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productDetailAction } from '../actions/productsAction';


const ProductCatalog = () => {

    const [data, setData] = React.useState([]);
    const [sort, setSort] = React.useState('');
    const [sortType, setSortTipe] = React.useState('');
    const [filterData, setFilterData] = React.useState({
        name: '',
        brand: '',
        category: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        Axios.get(API_URL + '/products/all')
            .then(res => {
                setData(res.data)
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const printCatalog = () => {
        let display = data.map(val => {
            return (
                <div id='product-catalog' className='mx-md-2 mx-auto' onClick={() => navigate(`/products/details?id=${val.id}`, {state : val})}>
                    <img className='shadow' src={API_URL + val.images} alt='..' style={{ width: '275px' }} />
                    <div id='product-desc' className='rounded bg-primary p-4 text-center'>
                        <h5 className='fw-bold text-white'>{val.name}</h5>
                        <p className='text-white mb-2'>Rp. {val.price.toLocaleString('id')} ,-</p>
                    </div>
                </div>
            )
        })
        return display

    };

    const onFilter = () => {
        let query = [];
        for (let prop in filterData) {
            if (filterData[prop]) {
                query.push(`${prop}=${filterData[prop]}`);
            }
        }

       

        Axios.get(API_URL + '/products?' + query.join('&'))
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err);
            })
    };

    const onShowDetails = (id) => {
        Axios.get(API_URL + `/products?id=${id}`)
            .then(res => {
                dispatch(productDetailAction(res.data[0]));
            }).catch(err => {
                console.log(err);
            })
    };


    const onSort = () => {
        let query = '';
        if (sort === 'name' && sortType === 'ascending') {
            query = '_sort=name'
        } else if (sort === 'name' && sortType === 'descending') {
            query = '_sort=name&_order=desc'
        } else if (sort === 'price' && sortType === 'descending') {
            query = '_sort=price&_order=desc'
        } else if (sort === 'price' && sortType === 'ascending') {
            query = '_sort=price'
        }

        Axios.get(API_URL + '/products?' + query)
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err);
            })

        console.log(query);
    };

    const onReset = () => {
        getData();
    }


    return (
        <div id='catalog' className='container-fluid py-2'>
            <div className='container'>
                <div className='py-5'>
                    <h4 className='text-muted display-6 fw-bold'>Our Arrival Product</h4>
                    <p className='text-muted'>Choose product and <span className='fw-bold text-primary'>transact more easily</span></p>
                </div>

                <div className='row'>
                    <div className='col-8 mx-auto  col-md-3 pb-5'>
                        <div id='filter-side' className=' bg-primary rounded p-4 '>
                            <p className='fw-bold text-white'>Filter</p>
                            <input className='form-control  mx-aut0' type="text" placeholder='Name' onChange={(e) => setFilterData({ ...filterData, name: e.target.value })} />

                            <select className="form-select my-3" aria-label="Default select example" onChange={(e) => setFilterData({ ...filterData, brand: e.target.value })}>
                                <option value='' selected>Select Brand</option>
                                <option value="IKEA">IKEA</option>
                                <option value="Dekoruma">Dekoruma</option>
                                <option value="Mr. DIY">Mr. DIY</option>
                            </select>

                            <select className="form-select my-3" aria-label="Default select example" onChange={(e) => setFilterData({ ...filterData, category: e.target.value })}>
                                <option value='' selected>Select Category</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Livingroom">Livingroom</option>
                                <option value="Bedroom">Bedroom</option>
                            </select>

                            <div className='d-flex my-3'>
                                <input className='form-control  mx-aut0 px-2' type="text" placeholder='Minimum' onChange={(e) => setFilterData({ ...filterData, minimum: e.target.value })} />
                                <input className='form-control  mx-aut0 mx-2' type="text" placeholder='Maximum' onChange={(e) => setFilterData({ ...filterData, maximum: e.target.value })} />
                            </div>

                            <div className='mx-auto text-center'>
                                <Button className='mx-2' colorScheme='teal' size='md' onClick={onFilter}>
                                    Filter
                                </Button>

                                <Button className='mx-2' colorScheme='yellow' size='md' onClick={onReset}>
                                    Reset
                                </Button>
                            </div>

                        </div>

                        <div id='sort' className=' bg-success rounded p-4 my-5'>
                            <p className='fw-bold text-white'>Sort</p>

                            <select className="form-select my-3" aria-label="Default select example" onChange={(e) => setSort(e.target.value, console.log(e.target.value))} >
                                <option value='' selected>Sort By</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                            </select>

                            <select className="form-select my-3" aria-label="Default select example" onChange={(e) => setSortTipe(e.target.value, console.log(e.target.value))} >
                                <option value='' selected>Sort Type</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>

                            <div className='text-center'>
                                <Button className='mx-2' colorScheme='teal' size='md' onClick={onSort}>
                                    Sort
                                </Button>

                                <Button className='mx-2' colorScheme='yellow' size='md' onClick={onReset}>
                                    Reset
                                </Button>
                            </div>
                        </div>


                    </div>

                    <div id='catalog-side' className='col-12 px-5 col-md-9 d-flex flex-wrap'>
                        {printCatalog()}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default ProductCatalog;