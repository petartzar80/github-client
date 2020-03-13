import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import IssueList from './IssueList';

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
              bodyText
            }
          }
        }
        closedIssues: issues(last: 10, states: [CLOSED]) {
          edges {
            node {
              id
              title
              bodyText
            }
          }
        }
      }
    }
  }
`;

const Repo = ({ vars }) => {
  const [user, repo] = vars;
  const [tab, setTab] = useState();

  const { loading, error, data } = useQuery(GET_USER_REPO, {
    variables: { user, repo },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error.</p>;

  const pullRequests = data.user.repository.pullRequests.nodes;
  const openIssues = data.user.repository.openIssues.edges;
  const closedIssues = data.user.repository.closedIssues.edges;

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
        <div className="issue-container">

          <div className="tab-buttons">
            <button
              onClick={() => setTab('pull')}>Pull Requests</button>
            <button
              onClick={() => setTab('open')}>Open Issues</button>
            <button
              onClick={() => setTab('closed')}>Closed Issues</button>
          </div>

          {tab === 'pull' &&
            <div className="issue-list">
              <div className="issue-list-title">
                <h4>Pull Requests:</h4>
              </div>

              <ul>
                {pullRequests.map(pullReq => (
                  <div key={pullReq.id} className="issue-title">
                    <li>
                      <p>{pullReq.title}</p>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          }

          {tab === 'open' &&
            <div className="issue-list">
              <div className="issue-list-title">
                <h4>Open Issues:</h4>
              </div>
              <IssueList issues={openIssues} />
            </div>
          }

          {tab === 'closed' &&
            <div className="issue-list">
              <div className="issue-list-title">
                <h4>Closed Issues:</h4>
              </div>
              <IssueList issues={closedIssues} />
            </div>
          }

        </div>
      }
    </div>
  );
}

export default Repo;
