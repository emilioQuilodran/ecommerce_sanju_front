import {useState} from 'react'

/**
 * useCallback
 * 
 */

export default function useInput(type, initialValue){
    const [value, setValue] = useState(initialValue)

    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        value,
        onChange,
        type
    };
}