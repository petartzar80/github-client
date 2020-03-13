import React from 'react';

const IssueList = ({ issues }) => {

  return (
    <ul>
      {issues.map(issue => (
        <div key={issue.node.id} className="issue-title">
          <li>
            <p>{issue.node.title}</p>
          </li>
        </div>
      ))}
    </ul>
  )
};

export default IssueList;
