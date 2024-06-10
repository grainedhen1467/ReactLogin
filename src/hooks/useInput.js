import useLocalStorage from "./useLocalStorage"; // Importing useLocalStorage custom hook for local storage handling

const useInput = (key, initValue) => { // Custom hook named useInput
    const [value, setValue] = useLocalStorage(key, initValue); // Utilizing useLocalStorage hook to manage local storage

    const reset = () => setValue(initValue); // Function to reset input value to initial value

    const attributeObj = { // Object containing attributes for input element
        value, // Current value
        onChange: (e) => setValue(e.target.value) // Function to update value on input change
    }

    return [value, reset, attributeObj]; // Returning current value, reset function, and attribute object
}

export default useInput; // Exporting useInput custom hook
