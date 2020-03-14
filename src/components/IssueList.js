import React from 'react';
import { useState } from 'react';

import IssueItem from './IssueItem';

const IssueList = ({ issues }) => {
  console.log('issues: ', issues);

  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const showIssueDetails = (issue) => {
    setIssueDetails(issue.node);
    setVisible(!visible);
  }


  return (
    <ul>
      {issues.map(issue => (
        <div key={issue.node.id} className="issue-title">
          <li>
            <p onClick={() => showIssueDetails(issue)}>{issue.node.title}</p>
          </li>
        </div>
      ))}
      {visible &&
        <IssueItem props={[issueDetails, setVisible]} />
      }
    </ul>
  )
};

export default IssueList;
