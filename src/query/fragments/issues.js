import gql from 'graphql-tag';

import COMMENTS_FRAGMENT from './comments';

const ISSUES_FRAGMENT = gql`
  fragment issues on IssueConnection {
    edges {
      node {
        id
        title
        bodyText
        createdAt
        author {
          login
        }
        comments(first: 10) {
          ...comments
        }
      }
    }
  }

  ${COMMENTS_FRAGMENT}
`;

export default ISSUES_FRAGMENT;
