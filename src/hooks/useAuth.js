import { useContext, useDebugValue } from "react";

// AuthContext is imported from AuthProvider. This context provides access to the auth state and the setAuth function.
import AuthContext from "../context/AuthProvider"; 

const useAuth = () => {
    // Destructure the auth object from the AuthContext. The auth object contains the auth state.
    const { auth } = useContext(AuthContext);
    
    // useDebugValue is used for debugging purposes in React DevTools. It displays "Logged In" if the user is present in the auth state, otherwise "Logged Out".
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");
    
    // Return the entire context, which includes both the auth state and the setAuth function.
    return useContext(AuthContext);
}

export default useAuth;