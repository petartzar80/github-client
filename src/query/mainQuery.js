import gql from 'graphql-tag';

import REPOSITORY_FRAGMENT from './fragments/repository';

const GET_REPO = gql`
  query (
    $user: Boolean!
    $org: Boolean!
    $accountName: String!
    $repoName: String! 
    $cursor: String
  ) {
    user(login: $accountName) @include(if: $user){
      name
      repository(name: $repoName) {
        ...repo
      }
    }
    organization(login: $accountName) @include(if: $org){
      name
      repository(name: $repoName) {
        ...repo
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export default GET_REPO;
