import axios from '../api/axios'; // Importing axios for making HTTP requests
import useAuth from './useAuth'; // Importing the useAuth custom hook for managing authentication

// Custom hook for refreshing the authentication token
const useRefreshToken = () => {
    const { setAuth } = useAuth(); // Destructuring the setAuth function from the useAuth hook

    // Function to refresh the authentication token
    const refresh = async () => {
        // Sending a GET request to the '/refresh' endpoint to refresh the token
        const response = await axios.get('/refresh', {
            withCredentials: true // Including credentials in the request
        });

        // Updating the authentication state with the new token and roles
        setAuth(prev => {
            console.log(JSON.stringify(prev)); // Logging the previous authentication state
            console.log(response.data.accessToken); // Logging the new access token

            // Returning a new authentication state object with updated roles and access token
            return {
                ...prev, // Spreading the previous state to retain other properties
                roles: response.data.roles, // Updating roles from the response
                accessToken: response.data.accessToken // Updating access token from the response
            };
        });

        return response.data.accessToken; // Returning the new access token
    }

    return refresh; // Returning the refresh function
};

export default useRefreshToken; // Exporting the useRefreshToken custom hook
