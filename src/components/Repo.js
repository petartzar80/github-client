import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER_REPO = gql`
  query ($user: String!, $repo: String!) {
    user(login: $user) {
      name
      repository(name: $repo) {
        name
        pullRequests(last: 10) {
          nodes {
            id
            title
          }
        }
        openIssues: issues(last: 10, states: [OPEN]) {
          edges {
            node {
              id
              title
            }
          }
        }
        closedIssues: issues(last: 10, states: [OPEN]) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
`;

const Repo = ({ vars }) => {
  const [user, repo] = vars;
  const { loading, error, data } = useQuery(GET_USER_REPO, {
    variables: { user, repo },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error.</p>;

  const pullRequests = data.user.repository.pullRequests.nodes;
  const openIssues = data.user.repository.openIssues.edges;
  const closedIssues = data.user.repository.openIssues.edges;

  return (
    <div className="repo-container">
      <div className="repo-info">
        <h3>You are exploring repo "{data.user.repository.name}" by {data.user.name}.</h3>

        {!pullRequests.length
          && !openIssues.length
          && !closedIssues.length &&
          <h3>There are no pull requests nor issues here.</h3>
        }
      </div>

      {(pullRequests.length
        || openIssues.length
        || closedIssues.length) &&
        <div className="issues">
          <div className="issue-list">
            <h4>Pull Requests:</h4>
            <ul>
              {pullRequests.map(pullReq => (
                <li key={pullReq.id}>
                  <p>{pullReq.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="issue-list">
            <h4>Open Issues:</h4>
            <ul>
              {openIssues.map(issue => (
                <li key={issue.node.id}>
                  <p>{issue.node.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="issue-list">
            <h4>Closed Issues:</h4>
            <ul>
              {closedIssues.map(issue => (
                <li key={issue.node.id}>
                  <p>{issue.node.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </div>
  );
}

export default Repo;
