import axios from "axios";
import { refreshAccessToken, isTokenExpired } from "./authApi.js";

const API_URL = "http://localhost:8080/api/orders";

const getValidToken = async () => {
    let token = localStorage.getItem("accessToken");
    
    if (!token) {
        console.error("No access token found in localStorage");
        throw new Error("User not authenticated. Please login first.");
    }

    // Don't check expiration on client side - just use the token
    // The server will tell us if it's expired (401) or invalid (403)
    // This avoids issues with clock sync or JWT parsing
    return token;
};

export const createOrder = async (orderItems, location) => {
    let token = localStorage.getItem("accessToken");
    
    if (!token) {
        throw new Error("User not authenticated. Please login first.");
    }

    const orderDto = orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    const requestBody = {
        items: orderDto,
        location: location
    };

    try {
        const res = await axios.post(API_URL, requestBody, {
            headers: {
                Authorization: token
            }
        });
        
        return res.data;
    } catch (err) {
        // 401 = Unauthorized (token expired/invalid) - try refresh
        if (err.response?.status === 401) {
            try {
                token = await refreshAccessToken();
                const retryRes = await axios.post(API_URL, requestBody, {
                    headers: {
                        Authorization: token
                    }
                });
                return retryRes.data;
            } catch (retryErr) {
                throw new Error("Session expired. Please login again.");
            }
        }
        
        // 403 = Forbidden (access denied)
        if (err.response?.status === 403) {
            throw new Error("Access denied.");
        }
        
        throw err;
    }
};

export const getUserOrders = async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        throw new Error("User not authenticated. Please login first.");
    }

    try {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: token
            }
        });
        
        return res.data;
    } catch (err) {
        console.error("getUserOrders error:", err.response?.status, err.response?.data);
        
        // 401 = Unauthorized (token expired/invalid) - try refresh
        if (err.response?.status === 401) {
            try {
                console.log("Got 401, refreshing token...");
                const newToken = await refreshAccessToken();
                const retryRes = await axios.get(API_URL, {
                    headers: {
                        Authorization: newToken
                    }
                });
                return retryRes.data;
            } catch (retryErr) {
                console.error("Token refresh failed:", retryErr);
                throw new Error("Session expired. Please login again.");
            }
        }
        
        // 403 = Forbidden (access denied - not admin role)
        if (err.response?.status === 403) {
            throw new Error("Access denied. Admin privileges required.");
        }
        
        // Other errors
        throw err;
    }
};

