import gql from 'graphql-tag';
import COMMENTS_FRAGMENT from './comments';

const PULL_REQ_FRAGMENT = gql`
  fragment pullReqs on PullRequestConnection {
    nodes {
      id
      url
      title
      author {
        login
      }
      bodyHTML
      createdAt
      comments(first: 10) {
        ...comments
      }
    }
  }

  ${COMMENTS_FRAGMENT}
`;

export default PULL_REQ_FRAGMENT;
