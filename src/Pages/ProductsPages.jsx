import Axios from "axios";
import React from "react";
import { API_URL } from "../helper";
import { FaTrash, FaRegEdit, FaPlusCircle } from "react-icons/fa";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Select,
    Textarea,
    Image,
    ButtonGroup,
    filter
} from '@chakra-ui/react'

const ProductsPage = () => {

    const [data, setData] = React.useState([]);
    const [toggle, setToggle] = React.useState(false);
    const [toggleDelete, setToggleDelete] = React.useState(false);
    const [_productName, setProduct] = React.useState('');
    const [_description, setDescription] = React.useState('');
    const [_images, setImages] = React.useState('');
    const [_brand, setBrand] = React.useState('');
    const [_category, setCategory] = React.useState('');
    const [_stock, setStock] = React.useState('');
    const [_price, setPrice] = React.useState('');
    const [selectedData, setSelectedData] = React.useState(null);
    const [filterData, setFilterData] = React.useState({
        name: '',
        brand: '',
        category: ''
    });
 

    const toast = useToast();

    React.useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        Axios.get(API_URL + '/products/all')
            .then(res => {
                setData(res.data)
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
    }


    const printData = (array = data) => {
        let display = array.map((val, idx) => {
            return (
                <tr>
                    <th className="align-middle" scope="row">{idx + 1}</th>
                    <td className="align-middle">
                        <img className="rounded" src={API_URL + val.images} alt="productImages" style={{ width: "180px" }} />
                    </td>
                    <td className="align-middle">{val.name}</td>
                    <td className="align-middle">{val.brand}</td>
                    <td className="align-middle">{val.category} </td>
                    <td className="align-middle">Rp. {val.price.toLocaleString('id')},-</td>
                    <td className="align-middle">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-warning" onClick={onEdit}><FaRegEdit /></button>
                            <button className='btn btn-outline-danger' type='button' onClick={() => {
                                setSelectedData(val);
                                setToggleDelete(!toggleDelete);
                            }}><FaTrash size={24} /></button>
                        </div>
                    </td>
                </tr>
            )
        })
        return display;
    }

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('data', JSON.stringify({
            name: _productName,
            brand: _brand,
            category: _category,
            description: _description,
            stock: parseInt(_stock),
            price: parseInt(_price)
        }))
        formData.append('images', _images)
        Axios.post(API_URL + '/products/add', formData)
            .then(res => {
                if (res.data.success) {
                    toast({
                        title: "Item has been submitted",
                        duration: 3000,
                        status: "success",
                        isClosable: true,
                        position: 'top'
                    })
                }
                setToggle(!toggle);
                setImages('');
                setProduct('');
                setBrand('');
                setCategory('');
                setDescription('');
                setStock('');
                setPrice('');
                getData();

            }).catch(err => {
                toast({
                    title: "Error detected",
                    duration: 3000,
                    status: "error",
                    isClosable: true,
                    position: 'top'
                })
            })

    }
    console.log(selectedData);
    const onDelete = () => {
        Axios.delete(API_URL + `/products/delete/${selectedData.idproducts}`)
            .then(res => {
                getData()
                toast({
                    title: "Item has been deleted",
                    duration: 3000,
                    status: "success",
                    isClosable: true,
                    position: 'top'
                })
                getData();
                setSelectedData(null);
                setToggleDelete(!toggleDelete)
            }).catch(err => {
                getData()
                toast({
                    title: "delete function error!",
                    duration: 3000,
                    status: "error",
                    isClosable: true,
                    position: 'top'
                })
            })
    }

    const onEdit = () => {
        console.log('work');
    }

    const onFilter = () => {
        console.log(filterData);
        let query = [];
        for (let prop in filterData) {
            if (filterData[prop]) {
                query.push(`${prop}=${filterData[prop]}`)
            }
        }

        Axios.get(API_URL + '/products?' + query.join('&'))
        .then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const onReset = () => {
        getData()
    }


    return (
        <div>
            <div id="productsPage" className="py-5">
                <div id="Add product" className="container-fluid py-5">
                    <div className="container">
                        <div id="sub-title" className="row pb-5">
                            <div className="col-9">
                                <h3 className="display-6">Manage your products</h3>
                                <span className="text-muted">Prepare your products so the customer can </span> <span className="text-primary fw-bold">transact more easely.</span>
                            </div>

                            <div className="col-3 pt-4  text-end" >
                                <Button
                                    onClick={() => setToggle(!toggle)}
                                    leftIcon={<FaPlusCircle size={26} />}
                                    colorScheme='teal'
                                    variant='solid'
                                    type='button'
                                >
                                    Product
                                </Button>
                            </div>
                        </div>

                        <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Add your product</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl className="row">
                                        <div className="col-md-6">
                                            <img src={_images} alt="" />
                                            <FormLabel htmlFor='first-name'>Product Image</FormLabel>
                                            <Input placeholder='Image URL' autocomplete="off" type="file" onChange={(e) => setImages(e.target.files[0])} />
                                            <FormLabel htmlFor='first-name'>Description</FormLabel>
                                            <Textarea placeholder='Description' autocomplete="off" onChange={(e) => setDescription(e.target.value, console.log(e.target.value))} />
                                        </div>

                                        <div className="col-md-6">
                                            <FormLabel htmlFor='first-name'>Product Name</FormLabel>
                                            <Input placeholder='Product Name' autocomplete="off" onChange={(e) => setProduct(e.target.value, console.log(e.target.value))} />
                                            <FormLabel htmlFor='first-name'>Brand</FormLabel>
                                            <Select placeholder='Select option' onChange={(e) => setBrand(e.target.value, console.log(e.target.value))}>
                                                <option value='IKEA'>IKEA</option>
                                                <option value='Dekoruma'>Dekoruma</option>
                                                <option value='Mr. DIY'>Mr. DIY</option>
                                            </Select>
                                            <FormLabel htmlFor='first-name'>Category</FormLabel>
                                            <Select placeholder='Select option' onChange={(e) => setCategory(e.target.value, console.log(e.target.value))}>
                                                <option value='Kitchen'>Kitchen</option>
                                                <option value='Livingroom'>Livingroom</option>
                                                <option value='Bedroom'>Bedroom</option>
                                            </Select>
                                            <FormLabel htmlFor='first-name'>Price</FormLabel>
                                            <Input placeholder='Price' autocomplete="off" onChange={(e) => setPrice(e.target.value, console.log(e.target.value))} />
                                            <FormLabel htmlFor='first-name'>Stock</FormLabel>
                                            <Input placeholder='Stock' autocomplete="off" onChange={(e) => setStock(e.target.value, console.log(e.target.value))} />
                                        </div>


                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='teal' mr={3} onClick={onSubmit}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>


                        {
                            selectedData ?
                                <Modal isOpen={toggleDelete} onClose={() => setToggleDelete(!toggleDelete)}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Are you sure to delete <span className='fw-bold main-color'> {selectedData.name}</span>?</ModalHeader>
                                        <ModalFooter>
                                            <ButtonGroup>
                                                <Button type='button' variant='outline' colorScheme='yellow'
                                                    onClick={() => {
                                                        setSelectedData(null);
                                                        setToggleDelete(!toggleDelete);
                                                    }}
                                                >No
                                                </Button>
                                                <Button type='button' variant='outline' colorScheme='teal' onClick={() => onDelete()}>Yes</Button>
                                            </ButtonGroup>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                : null
                        }

                    </div>

                    <div id="Filter" className="container " >
                        <div className="d-flex flex-column border rounded p-3">
                            <p id="Filter" className="fw-bold text-muted">Filter</p>
                            <div className="row">
                                <div className="col-12 col-md-3 py-2">
                                    <input className="form-control" type="text" placeholder="Name" onChange={(e) => setFilterData({...filterData, name: e.target.value})} />
                                </div>

                                <div className="col-12 col-md-3 py-2">
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setFilterData({...filterData, brand: e.target.value})}>
                                        <option value='' selected>Select brand</option>
                                        <option value="IKEA">IKEA</option>
                                        <option value="Dekoruma">Dekoruma</option>
                                        <option value="Mr. DIY">Mr. DIY</option>
                                    </select>
                                </div>

                                <div className="col-12 col-md-3 py-2">
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setFilterData({...filterData, category: e.target.value})}>
                                        <option value='' selected>Select Category</option>
                                        <option value="Kitchen">Kitchen</option>
                                        <option value="Livingroom">Livingroom</option>
                                        <option value="Bedroom">Bedroom</option>
                                    </select>
                                </div>

                                <div className="col-12 col-md-3 py-2 d-flex justify-content-evenly">
                                    <Button colorScheme='teal' size='md' onClick={onFilter}>
                                        Filter
                                    </Button>

                                    <Button variant='outline' colorScheme='yellow' size='md' onClick={onReset}>
                                        Reset
                                    </Button>

                                </div>


                            </div>
                        </div>


                        <div id="table">
                            <table className="table mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">NO</th>
                                        <th scope="col">PREVIEW</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">BRAND</th>
                                        <th scope="col">CATEGORY</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>

                                <tbody className="mt-4">
                                    {printData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default ProductsPage;