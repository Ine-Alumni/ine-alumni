import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

export const register = (fullName, email, password, major, 
    graduationYear, phoneNumber, gender, country, city) => {
        return axios.post(API_URL +"/auth/signup", {
            fullName, email, password, major, 
            graduationYear, phoneNumber, gender, country, city
        })
}

export const login = (email, password) => {
    return axios.post(API_URL + "/auth/signin", {
        email, password
    }).then((response) => {
        if(response.data.response.token){
            localStorage.setItem("auth", JSON.stringify(response.data.response));
        }
        return response;
    });
}

export const logout = () => {
    localStorage.removeItem("auth");
}

export const getAuthenticationState = () => {
    return JSON.parse(localStorage.getItem("auth")) || null;
}

export const verifyEmail = (otp) => {
    return axios.get(API_URL + "/email/verify", {headers: authHeader(), params: {token: otp} });
}

export const resendVerificationEmail = () => {
    return axios.post(API_URL + "/email/resend-verification", {}, {headers: authHeader() });
}
