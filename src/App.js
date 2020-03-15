import React from 'react';
import { useState } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import './styles.css';

import Title from './components/Title';
import Repo from './components/Repo';

const App = () => {
  const [token, setToken] = useState('');
  const [path, setPath] = useState('');
  const [client, setClient] = useState();
  const [stretch, setStretch] = useState('');
  const [user, setUser] = useState();
  const [repo, setRepo] = useState();

  const handleChangeToken = e => {
    setToken(e.target.value);
  }

  const handleChangePath = e => {
    setPath(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setClient(new ApolloClient({
      uri: 'https://api.github.com/graphql',
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      },
    }));

    setStretch('container-stretch');

    const [user, repo] = path.split('/');
    setUser(user);
    setRepo(repo);
  }

  return (
    <div className={`container ${stretch}`}>
      <header className="header">
        {/* <h1>GitHub Client</h1> */}
        <Title />
      </header>

      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-content">
            <div className="form-input">
              <label htmlFor="githubToken">
                Please, enter your OAuth GitHub token:
              </label>
              <input
                id="githubToken"
                type="text"
                value={token}
                onChange={(e) => handleChangeToken(e)}
                className="input-field token-input"
                required
              />
            </div>
            <div className="form-input">
              <label htmlFor="url">
                Get issues from https://github.com/
              </label>
              <input
                id="url"
                type="text"
                value={path}
                onChange={(e) => handleChangePath(e)}
                className="input-field"
                required
              />
            </div>
            <div className="form-button">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>

      {client &&
        <ApolloProvider client={client}>
          <Repo vars={[user, repo]} />
        </ApolloProvider>
      }
    </div>
  );
}

export default App;
