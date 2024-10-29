"use client";
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../services/backend/userService';
import { createProduct, deleteProduct, getProducts } from '../services/backend/productsService';
import { useRouter } from 'next/navigation';
import handleApiError from '../handleApiError';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: ''
    });
    const router = useRouter()
    useEffect(() => {
        const fetchUserRoleAndProducts = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserRole(userInfo.role);

                const products = await getProducts();
                setProducts(products);
            } catch (err) {
                // handleApiError(err)
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRoleAndProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId)
            setProducts(products.filter((product) => product.id !== productId));
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.description || !newProduct.price) {
            alert("All fields are required.");
            return;
        }

        const productData = {
            name: newProduct.name,
            description: newProduct.description,
            price: parseFloat(newProduct.price),
        };

        try {
            const response = await createProduct(productData)
            setProducts((prevProducts) => [...prevProducts, response]);
            setIsModalOpen(false); 
            setNewProduct({ name: '', description: '', price: '' }); 
        } catch (err) {
            console.error('Failed to add product', err);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.replace('/')
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const Spinner = () => (
        <div role="status" className="flex items-center justify-center h-screen">
            <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
    if (loading) return <div className="text-center text-xl"><Spinner /></div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-3xl w-3/4 mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
                <ul className="space-y-4">
                    {products.map((product) => (
                        <li key={product.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition hover:shadow-md">
                            <span className="text-lg text-gray-700">{product.name}</span>
                            {userRole === 'admin' && (
                                <button 
                                    onClick={() => handleDeleteProduct(product.id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                {userRole === 'admin' && (
                    <div className="mt-6">
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                )}

                {/* Modal for Adding New Product */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 mb-4 w-full rounded"
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Product Description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 mb-4 w-full rounded"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 mb-4 w-full rounded"
                                required
                            />
                            <button 
                                onClick={handleAddProduct} 
                                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
                            >
                                Add Product
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
