import React from 'react';
import { useState } from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues }) => {
  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const sortedIssues = issues.sort((a, b) => {
    if (a.node) { a = a.node };
    if (b.node) { b = b.node };
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const showIssueDetails = (issue) => {
    setIssueDetails(issue);
    setVisible(!visible);
  }

  return (
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
  )
};

export default IssueList;
