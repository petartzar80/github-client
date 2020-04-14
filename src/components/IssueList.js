import React from 'react';
import { useState, useEffect, useRef } from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues, fetchMore, pageInfo, type, accountType }) => {
  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    if (type === 'pull') {
      return {
        ...previousResult,
        [accountType]: {
          ...previousResult[accountType],
          repository: {
            ...previousResult[accountType].repository,
            pullRequests: {
              ...previousResult[accountType].repository.pullRequests,
              ...fetchMoreResult[accountType].repository.pullRequests,
              nodes: [
                ...previousResult[accountType].repository.pullRequests.nodes,
                ...fetchMoreResult[accountType].repository.pullRequests.nodes,
              ]
            },
          }
        }
      }
    }

    if (type === 'open') {
      return {
        ...previousResult,
        [accountType]: {
          ...previousResult[accountType],
          repository: {
            ...previousResult[accountType].repository,
            openIssues: {
              ...previousResult[accountType].repository.openIssues,
              ...fetchMoreResult[accountType].repository.openIssues,
              edges: [
                ...previousResult[accountType].repository.openIssues.edges,
                ...fetchMoreResult[accountType].repository.openIssues.edges,
              ]
            },
          }
        }
      }
    }

    if (type === 'closed') {
      return {
        ...previousResult,
        [accountType]: {
          ...previousResult[accountType],
          repository: {
            ...previousResult[accountType].repository,
            closedIssues: {
              ...previousResult[accountType].repository.closedIssues,
              ...fetchMoreResult[accountType].repository.closedIssues,
              edges: [
                ...previousResult[accountType].repository.closedIssues.edges,
                ...fetchMoreResult[accountType].repository.closedIssues.edges,
              ]
            },
          }
        }
      }
    }
  };

  const sortedIssues = issues.sort((a, b) => {
    if (a.node) { a = a.node };
    if (b.node) { b = b.node };
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const showIssueDetails = (issue) => {
    setIssueDetails(issue);
    setVisible(!visible);
  }

  const elemRef = useRef();

  useEffect(() => {
    elemRef.current.scrollTop =
      elemRef.current.scrollHeight - elemRef.current.clientHeight;
  }, [sortedIssues]);

  return (
    <div>
      <div className="issue-list-window" ref={elemRef}>
        <ul>
          {sortedIssues.map(issue => {
            let issueKey;
            let issueTitle;
            let issueItem;

            if (issue.node) {
              issueKey = issue.node.id;
              issueTitle = issue.node.title;
              issueItem = issue.node;
            } else {
              issueKey = issue.id;
              issueTitle = issue.title;
              issueItem = issue;
            }

            return (
              <div key={issueKey} className="issue-title">
                <li>
                  <p onClick={() => showIssueDetails(issueItem)}>{issueTitle}</p>
                </li>
              </div>
            )

          })}

          {visible &&
            <IssueItem props={[issueDetails, setVisible]} />
          }

        </ul>
      </div>


      {pageInfo.hasNextPage && (
        <div className="more-issues-btn">
          <button
            type="button"
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: pageInfo.endCursor,
                },
                updateQuery,
              })
            }
          >
            More Issues
        </button>
        </div>
      )}
    </div>
  )
};

export default IssueList;
