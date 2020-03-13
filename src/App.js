import React from 'react';
import { useState } from 'react';

import { useQuery, ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

import './styles.css';

const GET_USER_REPO = gql`
  query ($user: String!, $repo: String!) {
    user(login: $user) {
      name
      repository(name: $repo) {
        name
      }
    }
  }
`;

const App = () => {
  const [token, setToken] = useState('');
  const [path, setPath] = useState('');
  const [client, setClient] = useState();
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

    const [user, repo] = path.split('/');
    setUser(user);
    setRepo(repo);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>GitHub Client</h1>
      </header>

      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-content">
            <div className="form-input">
              <label htmlFor="githubToken">
                Please, enter your personal OAuth GitHub token:
              </label>
              <input
                id="githubToken"
                type="text"
                value={token}
                onChange={(e) => handleChangeToken(e)}
                style={{ width: '300px' }}
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
                style={{ width: '300px' }}
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

const Repo = ({ vars }) => {
  const [user, repo] = vars;
  const { loading, error, data } = useQuery(GET_USER_REPO, {
    variables: { user, repo },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error.</p>;

  return (
    <div className="repo-container">
      <p>You are exploring repo "{data.user.repository.name}" by {data.user.name}.</p>
    </div>
  );
}

export default App;
