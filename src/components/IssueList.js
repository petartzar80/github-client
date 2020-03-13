import React from 'react';
import { useState } from 'react';

const IssueList = ({ issues }) => {
  const [visible, setVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState();

  const showIssueDetails = (issue) => {
    setVisible(!visible);
    setIssueDetails(issue.bodyText);
  }

  return (
    <ul>
      {issues.map(issue => (
        <div key={issue.node.id} className="issue-title">
          <li>
            <p onClick={() => showIssueDetails(issue.node)}>{issue.node.title}</p>
          </li>
        </div>
      ))}
      {visible &&
        <div className="issue-details">
          <h4>Issue details: </h4>
          <p>{issueDetails}</p>
        </div>}
    </ul>
  )
};

export default IssueList;
