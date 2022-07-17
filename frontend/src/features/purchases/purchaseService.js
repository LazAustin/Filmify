import axios from "axios";

const API_URL = '/api/purchases/';

//Create new Purchase
const createPurchase = async (purchaseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, purchaseData, config)

    return response.data
}


//Get purchases
const getPurchases = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const getPurchase = async (purchaseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}${purchaseId}`, config)

    return response.data
}


//Delete Purchase
const deletePurchase = async (purchaseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + purchaseId, config)

    return response.data
}

//Update Purchase
const updatePurchase = async (purchaseId, purchaseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + purchaseId, purchaseData, config)

    return response.data
}

const purchaseService = {
    createPurchase,
    getPurchases,
    deletePurchase,
    updatePurchase,
    getPurchase
}

export default purchaseService