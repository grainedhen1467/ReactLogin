import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage"; // Importing useLocalStorage custom hook for local storage handling

const useInput = (key, initValue, useStorage) => {
    const [value, setValue] = useState(initValue);
    const [useLocalStorageValue, setUseLocalStorageValue] = useLocalStorage(key, initValue);

    const setInputValue = (newValue) => {
        if (useStorage) {
            setUseLocalStorageValue(newValue);
        } else {
            setValue(newValue);
        }
    };

    const reset = () => setInputValue(initValue);

    useEffect(() => {
        if (useStorage) {
            setInputValue(useLocalStorageValue);
        }
    }, [useStorage, useLocalStorageValue]);

    const attributeObj = {
        value: useStorage ? useLocalStorageValue : value,
        onChange: (e) => setInputValue(e.target.value),
    };

    return [useStorage ? useLocalStorageValue : value, reset, attributeObj];
};

export default useInput;
