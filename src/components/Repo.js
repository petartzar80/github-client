import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import IssueList from './IssueList';
import GET_USER_REPO from '../query/mainQuery';

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
              <IssueList issues={pullRequests} />

              {/* <ul>
                {pullRequests.map(pullReq => (
                  <div key={pullReq.id} className="issue-title">
                    <li>
                      <p>{pullReq.title}</p>
                    </li>
                  </div>
                ))}
              </ul> */}
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
