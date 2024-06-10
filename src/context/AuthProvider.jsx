import { createContext, useState } from "react";

// Create a context object for authentication, with an empty object as the default 
// value
const AuthContext = createContext({});

// Define the AuthProvider component that will wrap other components to provide
// authentication context
export const AuthProvider = ({ children }) => {
    // Create a state variable 'auth' and a function 'setAuth' to update it,
    // initialized with an empty object
    const [auth, setAuth] = useState({});

    // Return the AuthContext.Provider component, passing the auth state and setAuth 
    // function as the value The {children} prop allows this component to wrap 
    //other components
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// Export the AuthContext object for use in other components
export default AuthContext;
