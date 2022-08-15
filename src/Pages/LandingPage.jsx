import React from 'react';
import Axios from 'axios';
import { categoryAction } from '../actions/catalogAction'
import { useDispatch } from 'react-redux';
import { API_URL } from '../helper';
import { useNavigate } from 'react-router-dom';
import { categoryReducer } from '../reducers/categoryReducer';

const LandingPage = (props) => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleCategory = (query) => {

        Axios.get(API_URL + `/products` + query)
        .then(res => {
            console.log(res.data);
            dispatch(categoryAction(res.data))
            navigate('/products', {replace: true})

        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div >
            <div className='background' style={{marginBottom: "5%" }}>
                <div id='carousel' className='d-flex justify-content-center align-items-center'>
                    <div className='d-none d-md-block w-75'></div>
                    <div id="carouselExampleDark" className="carousel carousel-dark slide w-100 w-lg-50 align-items-center flex-column" data-bs-ride="carousel">
                    
                        <div className="carousel-inner ">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg" className="carousel-image d-block w-100" style={{height: '320px'}} alt="..." />
                                <div class="carousel-caption d-md-block">
                                    <h5 className='text-start display-6 mb-1'>Find your best<span className='fw-bold'> Livingroom </span>furniture</h5>
                                    <p className='text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates facere adipisci suscipit. Ex facere illo ipsum unde velit recusandae laudantium sit est debitis voluptatibus quae nobis expedita exercitationem, soluta doloribus.</p>
                                    <p className='text-end'><button className='btn btn-outline-light position-absolut' onClick={()=> {handleCategory(`?category=Livingroom`)}} >Buy Now</button></p>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg" className="carousel-image d-block w-100" style={{height: '320px'}}  alt="..." />
                                <div className="carousel-caption d-md-block">
                                <h5 className='text-start display-6 mb-1'>Find your best <span className='fw-bold'> Bedroom </span>furniture</h5>
                                    <p className='text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aspernatur omnis beatae architecto alias voluptate dolore tempora amet, aliquam atque officia, illum mollitia nobis quae fuga saepe blanditiis unde nulla!</p>
                                    <p className='text-end'><button className='btn btn-outline-light position-absolut' onClick={()=> {handleCategory(`?category=Bedroom`)}} >Buy Now</button></p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg" className="carousel-image d-block w-100" style={{height: '320px'}}  alt="..." />
                                <div className="carousel-caption d-md-block">
                                <h5 className='text-start display-6 mb-1'>Find your best <span className='fw-bold'> Kitchen </span> furniture</h5>
                                    <p className='text-start'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident earum sapiente ipsam tenetur odit, mollitia consequuntur qui perferendis et voluptas perspiciatis porro rerum aliquid veritatis nisi, impedit animi? Officia, eaque?</p>
                                    <p className='text-end'><button className='btn btn-outline-light position-absolut' onClick={()=> {handleCategory(`?category=Kitchen`)}} >Buy Now</button></p>
                                    {/* navigate('/products') */}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            <div id='products' className='container-fluid '>
                <div className='container'>

                    <div className='row' style={{marginTop: "15%" }}>
                        <div className='product-text col-12 col-md-6 mx-2' >
                            <h2 className='text-muted display-4' style={{marginTop: "20%" }}>Natural Curved Back Chair</h2>
                            <p>
                            Featuring a rounded back with sloping sides curving around a wide seat, our blue-speckled Moris chair provides plush comfort in a modern style. With petite brown rubberwood legs adding the perfect finishing touch, this exclusive chair's light neutral textured upholstery is a polished fit for studies, living rooms and more.
                            </p>
                        </div>

                        <div className='col-12 col-md-5 shadow ' >
                            <img className='product-img' src="https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/87344_XXX_v1.tif&wid=2000&cvt=jpeg" alt=""/>
                        </div>
                    </div>

                    <div className='row' style={{marginTop: "15%" }}>
                        <div className='product-text col-12 col-md-6 order-md-2 mx-2'>
                            <h2 className='text-muted display-4' style={{marginTop: "20%" }}>Adjustable work desk.</h2>
                            <p>
                            Electronically height adjustable table offers comfort and ergonomics to your workstation by enabling standing up while working. The table has a cable tray where all the wires can be neatly stored.
                            </p>
                        </div>

                        <div className='product-text col-12 col-md-5 order-md-1 shadow'>
                            <img className='product-img' src="https://media.fds.fi/product_image/800/536_String120_20_TH.jpg" alt=""/>
                        </div>
                    </div>

                    <div className='row' style={{marginTop: "15%" }}>
                        <div className='col-12 col-md-6 mx-2 '>
                            <h2 className='text-muted display-4'style={{marginTop: "20%" }}>Chesterfield Tufted Loveseat Sofa Couch</h2>
                            <p>
                            An updated twist on a classic Chesterfield, this handsome tufted sofa is as comfortable as it is eye-catching. Its sturdy design and high performance upholstery will bring enduring style and durability to your home.
                            </p>
                        </div>

                        <div className='col-12 col-md-5 shadow'>
                            <img className='product-img' src="https://cdn-cas.orami.co.id/parenting/images/bahan_sofa_linen.width-800.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;