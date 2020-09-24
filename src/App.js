import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const data = {
      title: `Title ${Date.now()}`,
      url: `teste`,
      techs: [`sempre`, `vue`],
    };
    api.post("repositories", data)
      .then(res => setRepositories([...repositories, res.data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(res => {
        setRepositories(repositories.filter(item => item.id !== id));
      });
  }

  useEffect(() => {
    api.get("/repositories").then((res) => {
      console.log(res.data);
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => 
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>Remover</button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
