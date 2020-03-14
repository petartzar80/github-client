import React from 'react';
import { useState } from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues }) => {

  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const showIssueDetails = (issue) => {
    setIssueDetails(issue);
    setVisible(!visible);
  }


  return (
    <ul>
      {issues.reverse().map(issue => {
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
