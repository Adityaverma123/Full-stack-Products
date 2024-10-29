import axiosClient from "../clients/axiosClient";

export const getProducts = async () => {
    const response = await axiosClient.get('/products');
    return response.data
}

export const deleteProduct = async (id) => {
    await axiosClient.delete(`/products/${id}`);
}

export const createProduct = async (productData) => {
     const product =  (await axiosClient.post('/products', productData)).data;
     console.log("producttt added ", product)
     return product
}