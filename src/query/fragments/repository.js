import gql from 'graphql-tag';

import PULL_REQ_FRAGMENT from './pullReqs';
import ISSUES_FRAGMENT from './issues';

const REPOSITORY_FRAGMENT = gql`
  fragment repo on Repository {
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

  ${PULL_REQ_FRAGMENT}
  ${ISSUES_FRAGMENT}
`;

export default REPOSITORY_FRAGMENT;
