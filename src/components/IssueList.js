import React from 'react';
import { useState, useEffect, useRef } from 'react';

import IssueItem from './IssueItem';
// import StarThisRepo from './StarThisRepo';

const IssueList = ({ issues, fetchMore, pageInfo, type }) => {
  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    if (type === 'pull') {
      return {
        ...previousResult,
        user: {
          ...previousResult.user,
          repository: {
            ...previousResult.user.repository,
            pullRequests: {
              ...previousResult.user.repository.pullRequests,
              ...fetchMoreResult.user.repository.pullRequests,
              nodes: [
                ...previousResult.user.repository.pullRequests.nodes,
                ...fetchMoreResult.user.repository.pullRequests.nodes,
              ]
            },
          }
        }
      }
    }

    if (type === 'open') {
      return {
        ...previousResult,
        user: {
          ...previousResult.user,
          repository: {
            ...previousResult.user.repository,
            openIssues: {
              ...previousResult.user.repository.openIssues,
              ...fetchMoreResult.user.repository.openIssues,
              edges: [
                ...previousResult.user.repository.openIssues.edges,
                ...fetchMoreResult.user.repository.openIssues.edges,
              ]
            },
          }
        }
      }
    }

    if (type === 'closed') {
      return {
        ...previousResult,
        user: {
          ...previousResult.user,
          repository: {
            ...previousResult.user.repository,
            closedIssues: {
              ...previousResult.user.repository.closedIssues,
              ...fetchMoreResult.user.repository.closedIssues,
              edges: [
                ...previousResult.user.repository.closedIssues.edges,
                ...fetchMoreResult.user.repository.closedIssues.edges,
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

      {/* <StarThisRepo /> */}

    </div>
  )
};

export default IssueList;
