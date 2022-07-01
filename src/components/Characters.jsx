import React, {useEffect, useState} from 'react'


//high order compoments
export default React.memo(
    function Characters(){
        const [characters, setCharacters] = useState([])  
        
        // no es buena practica xq se renderizan los componentes
        // de forma innecesaria
        useEffect(()=>{
            fetch()
            .then(response=>response.json())
            .then(({results})=>{
                setCharacters(results)
            }).catch(console.log)
        }, [])

        return (
          <>
              {
                  characters.map(character=>(
                      <article key={character.id}>
                          <p>{character.name}</p>
                          <img src={character.image} alt={character.name} />
                      </article>
                  ))
              }
          </>
        )
      }
)