import React, { useState, useEffect } from 'react';

const IssueItem = ({ props }) => {

  const [issue, visible] = props;
  const initialComments = issue.comments.nodes;
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  }

  useEffect(() => {
    const regex = new RegExp(input, 'gi');

    if (input) {
      const filteredComments = initialComments.filter(comment =>
        comment.author.login.match(regex) || comment.bodyText.match(regex)
      );
      setComments(filteredComments);

    } else setComments(initialComments);
  }, [input, initialComments]);

  return (
    <div className="overlay">
      <div className="issue-item">
        <p className="close" onClick={() => visible(false)}>X</p>
        <div className="issue-item-title">
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

        {(initialComments.length > 0) &&
          <div className="comments-title">
            <h3>Filter comments by username or content:</h3>
            <input
              type="text"
              value={input}
              onChange={(e) => handleChange(e)}
              style={{ width: '300px' }}
            />
          </div>
        }

        {(comments.length > 0) &&
          <ul className="comments-list">
            {comments.map(comment => (
              <li key={comment.createdAt} className="comment">
                <div className="comment-author">
                  <p>{comment.author.login} commented on {comment.createdAt}</p>
                </div>
                <div className="comment-content">
                  <p>{comment.bodyText}</p>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default IssueItem;

