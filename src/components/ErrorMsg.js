import React from 'react';

const ErrorMessage = ({ error }) => (
  <div className="error-container">
    <h4>Something went wrong...</h4>
    <div className="error-msg">
      <p>{error.message}</p>
    </div>
  </div>
)

export default ErrorMessage;
