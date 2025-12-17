import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const res = await axios.get(`${API_URL}/refresh`, {
            headers: {
                refreshToken: refreshToken
            }
        });
        
        // The backend returns just the token string, not JSON
        const newAccessToken = typeof res.data === 'string' ? res.data : res.data.access_token;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (err) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw err;
    }
};

export const isTokenExpired = (token) => {
    if (!token) {
        console.log('No token provided');
        return true;
    }
    
    try {
        // Split token into parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.warn('Invalid token format - not a JWT');
            // Not a valid JWT, but don't mark as expired - let server validate
            return false;
        }

        // Decode the payload
        const payload = JSON.parse(atob(parts[1]));
        console.log('Token payload:', payload);
        
        // Check if exp field exists
        if (!payload.exp) {
            console.warn('Token does not have expiration field (exp)');
            // If no exp field, assume not expired - let server validate
            return false;
        }

        const exp = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const isExpired = now >= exp;
        
        if (isExpired) {
            console.log('Token expired:', { 
                exp: new Date(exp), 
                now: new Date(now),
                diff: (now - exp) / 1000 + ' seconds'
            });
        } else {
            console.log('Token valid, expires in:', (exp - now) / 1000, 'seconds');
        }
        
        return isExpired;
    } catch (err) {
        console.error('Error checking token expiration:', err);
        // If we can't parse, don't assume expired - let the server decide
        // The server will reject invalid tokens anyway
        return false;
    }
};

