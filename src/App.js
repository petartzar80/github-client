import React from 'react';
import { useQuery, ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

const GET_USER_REPO = gql`
  {
    user(login: "egoist") {
      name
      repository(name: "poi") {
        name
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_TOKEN
          }`,
      },
    });
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Repo />
    </ApolloProvider>
  );
}

const Repo = () => {
  const { loading, error, data } = useQuery(GET_USER_REPO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.toString}</p>;

  return (
    <p>You are exploring repo "{data.user.repository.name}" by {data.user.name}.</p>
  );
}

export default App;
