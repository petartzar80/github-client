import React from 'react';
import { useState, useEffect, useRef } from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues, fetchMore, pageInfo, issueType, accountType }) => {
  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    let items;
    issueType === 'pullRequests' ? items = 'nodes' : items = 'edges';

    return {
      ...previousResult,
      [accountType]: {
        ...previousResult[accountType],
        repository: {
          ...previousResult[accountType].repository,
          [issueType]: {
            ...previousResult[accountType].repository[issueType],
            ...fetchMoreResult[accountType].repository[issueType],
            [items]: [
              ...previousResult[accountType].repository[issueType][items],
              ...fetchMoreResult[accountType].repository[issueType][items],
            ]
          },
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
