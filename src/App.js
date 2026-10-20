import React, {useState} from 'react';
import GithubImg from './github-logo.jpg'
import './App.css';

function App() {

  const [search, setSearch]  = useState('');
  const [userData, setUserData] = useState();
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede a submissão padrão do formulário (evita recarregar a página)
    fetch(`https://api.github.com/users/${search}`) // pegamos o valor digitado no 'search', consultamos a API do GitHub e traz os dados de volta
    .then(response => response.json())
    .then(userResponse => setUserData(userResponse));
  
  }
  const handleChange = (event) => { // Atualiza o estado "search" a cada tecla digitada no input
  setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">GitHub profile</h1>
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <div className="input-group">
               <input 
                  type="text" 
                  className="form-control"
                  required
                  value={search}
                  onChange={handleChange}
                />  
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-success">
                    Search
                  </button>
                </span>
            </div>
          </div>
      </form>
      <div className="py-5">
        {!userData && (
            <img 
              src={GithubImg} 
              className="responsive rounded-circle" 
              alt=""
              height="200p"
            />
          )}
          {userData && (
             <div>
            <img 
              src={userData.avatar_url} 
              className="responsive rounded-circle" 
              alt=""
              height="200p"
            />
            <h1 className="pt-5">
              <a href={userData.html_url} target="_new">{userData.name}
              </a>
            </h1>
            <h2>{userData.location}</h2>
            <p>
              <a href={userData.blog} target="_new" className="text-info">
              {userData.blog}
              </a>
            </p>
          </div>
          )}
         
      </div>
    </div>
  );
}
export default App;