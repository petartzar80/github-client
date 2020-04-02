import gql from 'graphql-tag';

import PULL_REQ_FRAGMENT from './fragments/pullReqs';
import ISSUES_FRAGMENT from './fragments/issues';

const GET_USER_REPO = gql`
  query ($user: String!, $repo: String!, $cursor: String) {
    user(login: $user) {
      name
      repository(name: $repo) {
        name
        pullRequests(
          first: 5
          orderBy: { field: CREATED_AT, direction: DESC }
          after: $cursor
        ) {
          ...pullReqs
        }
        openIssues: issues(
          first: 5
          orderBy: { field: CREATED_AT, direction: DESC }
          after: $cursor,
          states: [OPEN]
        ) {
          ...issues
        }
        closedIssues: issues(
          first: 5
          orderBy: { field: CREATED_AT, direction: DESC }
          after: $cursor,
          states: [CLOSED]
        ) {
          ...issues
        }
      }
    }
  }

  ${PULL_REQ_FRAGMENT}
  ${ISSUES_FRAGMENT}
`;

export default GET_USER_REPO;
