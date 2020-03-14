import gql from 'graphql-tag';

import PULL_REQ_FRAGMENT from './fragments/pullReqs';
import ISSUES_FRAGMENT from './fragments/issues';

const GET_USER_REPO = gql`
  query ($user: String!, $repo: String!) {
    user(login: $user) {
      name
      repository(name: $repo) {
        name
        pullRequests(last: 10) {
          ...pullReqs
        }
        openIssues: issues(last: 10, states: [OPEN]) {
          ...issues
        }
        closedIssues: issues(last: 10, states: [CLOSED]) {
          ...issues
        }
      }
    }
  }

  ${PULL_REQ_FRAGMENT}
  ${ISSUES_FRAGMENT}
`;

export default GET_USER_REPO;
