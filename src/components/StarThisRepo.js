import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
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

const STAR_REPO = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UNSTAR_REPO = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const StarThisRepo = () => {
  const [addStar] = useMutation(STAR_REPO);
  const [removeStar] = useMutation(UNSTAR_REPO);

  const [spread, setSpread] = useState('');


  const { loading, error, data } = useQuery(
    GET_STARS
  );

  useEffect(() => {
    setTimeout(() => setSpread('spread'), 1000);
  }, [data]);

  if (!data || loading || error) return null;




  const id = data.user.repository.id;
  const stars = data.user.repository.stargazers.totalCount;

  return (
    <div className={`star-container ${spread}`}>

      {!data.user.repository.viewerHasStarred ? (
        <React.Fragment>
          <p>If you appreciate what you see, do consider starring the Github Client repo by clicking the button below.</p>
          <button onClick={() => addStar({ variables: { id } })}>My pleasure.</button>
        </React.Fragment>
      ) : (
          <React.Fragment>
            <p>Of course, you can try unstarring the repo too, if you promise you'll add the star again.</p>
            <button onClick={() => removeStar({ variables: { id } })}>I promise.</button>
          </React.Fragment>
        )}

      <p>Stars count: {stars}</p>
    </div>
  )
}

export default StarThisRepo;
