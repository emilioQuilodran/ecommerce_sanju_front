import React, {useCallback} from 'react'
import Characters from '../components/Characters';

export const Callback = (characters) => {

    const handleClick = useCallback((event)=>{
        console.log('click', event.currentTarget);
    },[])
    return (
        <>
            <div>useCallback</div>
            <Characters characters={characters} />
        </>
    )
}
