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
  const [account, setAccount] = useState();
  const [repo, setRepo] = useState();
  const [accountType, setAccountType] = useState();

  const handleChangeAccount = e => {
    setClient(null);
    setStretch(null);
    setPath('');
    setAccountType(e.target.value);
  }

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

    const [account, repo] = path.split('/');
    setAccount(account);
    setRepo(repo);
  }

  return (
    <div className={`container ${stretch}`}>
      <header className="header">
        <Title />
      </header>

      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-content">
            <div className="inputs">
              <div className="account">
                <div className="form-button btn-account">
                  <button
                    className={`${accountType === 'user' ? "highlight" : ""}`}
                    type="reset"
                    value="user"
                    onClick={(e) => handleChangeAccount(e)}
                  >User</button>
                </div>
                <div className="form-button btn-account">
                  <button
                    className={`${accountType === 'organization' ? "highlight" : ""}`}
                    type="reset"
                    value="organization"
                    onClick={(e) => handleChangeAccount(e)}
                  >Organization</button>
                </div>
              </div>

              <div className="form-input">
                <label htmlFor="githubToken">
                  OAuth GitHub token:
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
                  Path (user/repo):
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
            </div>

            <div className="form-button">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>

      {client &&
        <ApolloProvider client={client}>
          <Repo vars={[accountType, account, repo]} />
        </ApolloProvider>
      }
    </div>
  );
}

export default App;
