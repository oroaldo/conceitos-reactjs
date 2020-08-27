import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      //console.log(response.data)
    })
  }, []) 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:"REACT",
      url:"http://www.endereco.com.br/appmobile",
      tech: [ "ReactNative", "Flex"]
    })

    const newrepositorie = response.data

    setRepositories([...repositories, newrepositorie])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/'+id)

    if (response.status == '204'){
      const newrepositorie = repositories.filter(repositorie => repositorie.id !== id)
      console.log(newrepositorie)
      setRepositories(newrepositorie)
    }
  }

  return (
    <>  
      <ul data-testid="repository-list">
        {repositories.map(dados => 
          <li key={dados.id}>{dados.title}
            <button onClick={() => handleRemoveRepository(dados.id)}>
                Remover
            </button>
          </li>)}
      </ul>

      {<button onClick={handleAddRepository}>Adicionar</button>}
  </>
  );
}

export default App;
