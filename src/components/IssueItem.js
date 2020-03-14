import React from 'react';

const IssueItem = ({ props }) => {

  const [issue, visible] = props;
  const comments = issue.comments.nodes;

  return (
    <div className="overlay">
      <div className="issue-item">
        <p className="close" onClick={() => visible(false)}>X</p>
        <div className="issue-title">
          <h2>{issue.title}</h2>
        </div>


        <div className="comment initial-post">
          <div className="comment-author">
            <p>{issue.author.login} opened this issue on {issue.createdAt}</p>
          </div>
          <div className="comment-content">
            <p>{issue.bodyText}</p>
          </div>
        </div>

        {(comments.length > 0) &&
          <div className="comments-list">
            <div className="comments-title">
              <h3>Comments:</h3>
            </div>

            <ul>
              {comments.map(comment => (
                <li key={comment.createdAt}>
                  <div className="comment">
                    <div className="comment-author">
                      <p>{comment.author.login} commented on {comment.createdAt}</p>
                    </div>
                    <div className="comment-content">
                      <p>{comment.bodyText}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default IssueItem;

