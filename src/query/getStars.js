import gql from 'graphql-tag';

const GET_STARS = gql`
  query { 
    user(login: "petartzar80"){ 
      repository(name: "github-client") {
        id
        stargazers {
        totalCount
        }
        viewerHasStarred
      }
    }
  }
`;

export default GET_STARS;
