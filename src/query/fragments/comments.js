import gql from 'graphql-tag';

const COMMENTS_FRAGMENT = gql`
  fragment comments on IssueCommentConnection {
    nodes {
      author {
        login
      }
      bodyHTML
      createdAt
    }
  }
`;

export default COMMENTS_FRAGMENT;
