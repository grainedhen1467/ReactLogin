import useLocalStorage from "./useLocalStorage"; // Importing the useLocalStorage custom hook for managing local storage

// Custom hook for managing a boolean toggle state with local storage persistence
const useToggle = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue); // Using useLocalStorage to manage state and local storage

    // Function to toggle the boolean state
    const toggle = (value) => {
        setValue(prev => {
            // If a boolean value is provided, use it; otherwise, invert the current state
            return typeof value === 'boolean' ? value : !prev;
        });
    };

    // Returning the current state value and the toggle function
    return [value, toggle];
}

export default useToggle; // Exporting the useToggle custom hook
