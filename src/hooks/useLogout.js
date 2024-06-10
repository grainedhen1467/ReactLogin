import axios from "../api/axios"; // Importing axios for making HTTP requests
import useAuth from "./useAuth"; // Importing the useAuth custom hook for managing authentication

// Custom hook for handling user logout
const useLogout = () => {
    const { setAuth } = useAuth(); // Destructuring the setAuth function from the useAuth hook

    // Logout function
    const logout = async () => {
        setAuth({}); // Clearing authentication state by setting it to an empty object

        try {
            // Sending a request to the '/logout' endpoint to logout the user
            const response = await axios('/logout', {
                withCredentials: true // Including credentials in the request
            });
        } catch (err) {
            console.error(err); // Logging any errors that occur during the logout process
        }
    }

    return logout; // Returning the logout function
}

export default useLogout; // Exporting the useLogout custom hook
