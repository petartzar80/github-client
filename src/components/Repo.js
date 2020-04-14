import React from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import IssueList from './IssueList';
import ErrorMessage from './ErrorMsg';
import GET_REPO from '../query/mainQuery';
import StarThisRepo from './StarThisRepo';


const Repo = ({ vars }) => {
  const [accountType, accountName, repoName] = vars;
  const [tab, setTab] = useState();
  const user = accountType === 'user';
  const org = accountType !== 'user';

  const { loading, error, data, fetchMore } = useQuery(GET_REPO, {
    variables: { user, org, accountName, repoName },
  });

  if (loading) return <h4 className="loading">Loading...</h4>;
  if (error) return <ErrorMessage error={error} />;

  const result = data.user ? data.user.repository : data.organization.repository;

  const name = data.user ? data.user.name : data.organization.name;

  const pullRequests = result.pullRequests.nodes;
  const openIssues = result.openIssues.edges;
  const closedIssues = result.closedIssues.edges;
  const pullPageInfo = result.pullRequests.pageInfo;
  const openPageInfo = result.openIssues.pageInfo;
  const closedPageInfo = result.closedIssues.pageInfo;

  return (
    <div className="repo-container">
      <div className="repo-info">
        <h3>You are exploring repo "{result.name}" by {name}</h3>

        {!pullRequests.length
          && !openIssues.length
          && !closedIssues.length &&
          <h3>There are no pull requests nor issues here.</h3>
        }
      </div>

      {(pullRequests.length > 0
        || openIssues.length > 0
        || closedIssues.length > 0) &&
        <div className="issue-container">

          <div className="tab-buttons">
            <button
              onClick={() => setTab('pull')}
              className={`${tab === 'pull' ? "highlight-2" : ""}`}
            >
              Pull Requests
            </button>

            <button
              onClick={() => setTab('open')}
              className={`${tab === 'open' ? "highlight-2" : ""}`}
            >
              Open Issues
            </button>

            <button
              onClick={() => setTab('closed')}
              className={`${tab === 'closed' ? "highlight-2" : ""}`}
            >
              Closed Issues
            </button>

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
                issueType={'pullRequests'}
                accountType={accountType}
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
                issueType={'openIssues'}
                accountType={accountType}
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
                issueType={'closedIssues'}
                accountType={accountType}
              />
            </div>
          }

        </div>
      }
      {tab && <StarThisRepo />}
    </div>
  );
}

export default Repo;
