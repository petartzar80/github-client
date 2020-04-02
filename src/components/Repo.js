import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import IssueList from './IssueList';
import ErrorMessage from './ErrorMsg';
import GET_USER_REPO from '../query/mainQuery';

const Repo = ({ vars }) => {
  const [user, repo] = vars;
  const [tab, setTab] = useState();

  const { loading, error, data, fetchMore } = useQuery(GET_USER_REPO, {
    variables: { user, repo },
  });

  if (loading) return <h4 className="loading">Loading...</h4>;
  if (error) return <ErrorMessage error={error} />;

  const pullRequests = data.user.repository.pullRequests.nodes;
  const openIssues = data.user.repository.openIssues.edges;
  const closedIssues = data.user.repository.closedIssues.edges;

  const pullPageInfo = data.user.repository.pullRequests.pageInfo;
  const openPageInfo = data.user.repository.openIssues.pageInfo;
  const closedPageInfo = data.user.repository.closedIssues.pageInfo;

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
              <IssueList
                issues={pullRequests}
                fetchMore={fetchMore}
                pageInfo={pullPageInfo}
                type={'pull'}
              />
            </div>
          }

          {tab === 'open' &&
            <div className="issue-list">
              <div className="issue-list-title">
                <h4>Open Issues:</h4>
              </div>
              <IssueList
                issues={openIssues}
                fetchMore={fetchMore}
                pageInfo={openPageInfo}
                type={'open'}
              />
            </div>
          }

          {tab === 'closed' &&
            <div className="issue-list">
              <div className="issue-list-title">
                <h4>Closed Issues:</h4>
              </div>
              <IssueList
                issues={closedIssues}
                fetchMore={fetchMore}
                pageInfo={closedPageInfo}
                type={'closed'}
              />
            </div>
          }

        </div>
      }
    </div>
  );
}

export default Repo;
