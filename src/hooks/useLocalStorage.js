import { useState, useEffect } from "react";

// Function to get the value from local storage or initialize it
const getLocalValue = (key, initValue) => {
    // If window is undefined (e.g., during server-side rendering), return initial value
    if (typeof window === 'undefined') return initValue;

    // Try to parse the value from local storage
    const localValue = JSON.parse(localStorage.getItem(key));
    // If the value exists in local storage, return it
    if (localValue) return localValue;

    // If the initial value is a function, call it and return the result
    if (initValue instanceof Function) return initValue();

    // If none of the above conditions are met, return the initial value
    return initValue;
}

// Custom hook for managing state with local storage
const useLocalStorage = (key, initValue) => {
    // Initialize state with the value retrieved from local storage or the initial value
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    // Update local storage whenever the value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Return the state value and a function to update it
    return [value, setValue];
}

export default useLocalStorage; // Export the useLocalStorage hook
