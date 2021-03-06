import React, { useState, useEffect } from 'react';

import moment from 'moment';

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
            <p><span className="span-author">{issue.author.login}</span> opened this issue on <span className="span-date">{moment(issue.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
          </div>
          {issue.bodyHTML &&
            <div className="comment-content">
              <div dangerouslySetInnerHTML={{
                __html: issue.bodyHTML
              }}></div>
            </div>
          }
        </div>

        {(initialComments.length > 1) &&
          <div className="comments-title">
            <h3>Filter comments by username or content:</h3>
            <input
              type="text"
              value={input}
              onChange={(e) => handleChange(e)}
              className="input-field"
            />
          </div>
        }

        {(comments.length > 0) &&
          <div className="comments-container">
            {(initialComments.length === 1) &&
              <div className="comments-title">
                <h3>Comment:</h3>
              </div>
            }
            <ul className="comments-list">
              {comments.map(comment => (
                <li key={comment.createdAt} className="comment">
                  <div className="comment-author">
                    <p><span className="span-author">{comment.author.login}</span> commented on <span className="span-date">{moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></p>
                  </div>

                  <div className="comment-content">
                    <div dangerouslySetInnerHTML={{
                      __html: comment.bodyHTML
                    }}></div>
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

