import axios from "axios";
const BASE_URL = "http://localhost:3500";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});


// Interceptors will attacth the token to the request and even
// retry the request if the token is expired or has failed. the
// failure will come back as a 403 status code. the interceptors
// will work with our JWT token to refresh the token if our 
// initial request is denied due to an expired token.This will
// all work in the background and it will keep everything secure
// and it will continue to refresh the tokens on a set schedule.