import React, { useState, useEffect } from 'react';
import { IoMdCart } from "react-icons/io";
import img1 from '../Images/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg';
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function Admin1() {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [showProductsModal, setShowProductsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        brand: '',
        image: '',
        price: ''
    });
    const [editedProduct, setEditedProduct] = useState({
        id: '',
        brand: '',
        image: '',
        price: ''
    });
    const [orders, setOrders] = useState([]);
    const adminData = JSON.parse(localStorage.getItem('adminData'));

    const handleLogout = () => {
        localStorage.removeItem('adminData');
    };

    const toggleLogoutConfirmation = () => {
        setShowLogoutConfirmation(!showLogoutConfirmation);
    };

    const toggleProductsModal = () => {
        setShowProductsModal(!showProductsModal);
    };

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const toggleOrdersModal = () => {
        setShowOrdersModal(!showOrdersModal);
    };

    const toggleCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/order');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const addProduct = async () => {
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            await fetchProducts();
            toggleProductsModal();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const editProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${editedProduct?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedProduct)
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            await fetchProducts();
            toggleEditModal();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const disableProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ disabled: true })
            });
            if (!response.ok) {
                throw new Error('Failed to disable product');
            }
            await fetchProducts();
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error disabling product:', error);
        }
    };

    useEffect(() => {
        if (adminData) {
            fetchProducts();
            fetchOrders();
        }
    }, [adminData]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active " aria-current="page" href="#"><img src={img1} className="flip-image" style={{ width: '120px', height: '90px' }} alt="logo" /></a>
                            <input className="search" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        <IoSearch className='sicon' size={30} style={{ color: 'white' }} />
                        <div className='but'>
                            {adminData && (
                                <>
                                    <button onClick={toggleProductsModal} className="a nav-link " href="#" >PRODUCTS</button>
                                    <button onClick={toggleOrdersModal} className="a nav-link mx-5" href="#" >ORDERS</button>
                                    <button onClick={toggleLogoutConfirmation} className="btn btn-primary mx-4 px-4">LOGOUT</button>
                                </>
                            )}
                            {!adminData && (
                                <Link to="/adminlogin" className="btn btn-md btn-primary px-4">LOGIN</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Modal show={showProductsModal && adminData} onHide={toggleProductsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Products</Modal.Title>
                    <button className="btn btn-primary mx-5" onClick={toggleCreateModal}>Create product</button>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Disable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.pdid}>
                                    <td>{product.brand}</td>
                                    <td><img src={product.image} alt={product.brand} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{product.price}</td>
                                    <td><button className="btn btn-primary" onClick={() => {setEditedProduct(product); toggleEditModal();}}>Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={() => disableProduct(product.id)}>Disable</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleProductsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateModal && adminData} onHide={toggleCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="create-brand" className="form-label">Brand</label>
                            <input type="text" className="form-control" id="create-brand" name="brand" value={newProduct.brand} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="create-image" className="form-label">Image URL</label>
                            <input type="text" className="form-control" id="create-image" name="image" value={newProduct.image} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="create-price" className="form-label">Price</label>
                            <input type="text" className="form-control" id="create-price" name="price" value={newProduct.price} onChange={handleInputChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={addProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal && adminData} onHide={toggleEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="edit-brand" className="form-label">Brand</label>
                            <input type="text" className="form-control" id="edit-brand" name="brand" value={editedProduct.brand} onChange={handleEditInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edit-image" className="form-label">Image URL</label>
                            <input type="text" className="form-control" id="edit-image" name="image" value={editedProduct.image} onChange={handleEditInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edit-price" className="form-label">Price</label>
                            <input type="text" className="form-control" id="edit-price" name="price" value={editedProduct.price} onChange={handleEditInputChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEditModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={editProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showOrdersModal && adminData} onHide={toggleOrdersModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Address</th>
                                <th>User ID</th>
                                <th>Product Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.address}</td>
                                    <td>{order.userid}</td>
                                    <td>
                                        <ul>
                                            {order.cart.map(item => {
                                                const product = products.find(p => p.pdid === item.pdid);
                                                return (
                                                    <li key={item.id}>
                                                        {product && (
                                                            <div>
                                                                <div><strong>Brand:</strong> {product.brand}</div>
                                                                <div><strong>Price:</strong> {product.price}</div>
                                                                <div><strong>Quantity:</strong> {item.quantity}</div>
                                                                <div><strong>Image:</strong> <img src={product.image} alt={product.brand} style={{ width: '50px', height: '50px' }} /></div>
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleOrdersModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {showLogoutConfirmation && (
                <div className="alert alert-danger" role="alert">
                    Are you sure you want to logout?
                    <button onClick={handleLogout} className="btn btn-danger mx-2">Yes</button>
                    <button onClick={toggleLogoutConfirmation} className="btn btn-secondary">Cancel</button>
                </div>
            )}
            <Link to="/" className="home-link"><IoHome /></Link>
            
        </div>
    );
}

export default Admin1;
