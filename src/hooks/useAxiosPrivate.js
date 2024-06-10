import { axiosPrivate } from "../api/axios"; // Import the axios instance configured for private requests
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken"; // Import custom hook to return a refresh token
import useAuth from "./useAuth"; // Import custom hook to get authentication state

const useAxiosPrivate = () => {
    const refresh = useRefreshToken(); // Get the refresh token function
    const { auth } = useAuth(); // Get the authentication state

    useEffect(() => {
        // Add a request interceptor to include the access token in the request headers if not already present
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, 
            (error) => Promise.reject(error) // Handle request error
        );

        // Add a response interceptor to handle token refresh on 403 errors (forbidden)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, // If the response is successful, return it as is
            async (error) => {
                const prevRequest = error?.config; // Get the original request config
                // If the error is a 403 (forbidden) and the request hasn't been retried yet
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true; // Mark the request as sent to avoid infinite loops
                    const newAccessToken = await refresh(); // Refresh the access token
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Update the request with the new token
                    return axiosPrivate(prevRequest); // Retry the request with the new token
                }
                return Promise.reject(error); // Handle response error
            }
        );

        // Cleanup function to eject interceptors when the component unmounts or dependencies change
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]); // Dependency array: effect runs when auth or refresh changes

    return axiosPrivate; // Return the axios instance with interceptors attached
};

export default useAxiosPrivate; // Export the custom hook