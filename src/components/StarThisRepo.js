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

const updateAddStar = (cache) => {
  const query = cache.readQuery({
    query: GET_STARS,
  });

  const totalCount = query.user.repository.stargazers.totalCount + 1;
  const user = query.user;
  const repository = query.user.repository;

  cache.writeQuery({
    query: GET_STARS,
    data: {
      ...query,
      user: {
        ...user,
        repository: {
          ...repository,
          stargazers: {
            ...query.user.repository.stargazers,
            totalCount,
          },
        }
      }
    },
  });
};

const updateRemoveStar = (cache) => {
  const query = cache.readQuery({
    query: GET_STARS,
  });

  const totalCount = query.user.repository.stargazers.totalCount - 1;
  const user = query.user;
  const repository = query.user.repository;

  cache.writeQuery({
    query: GET_STARS,
    data: {
      ...query,
      user: {
        ...user,
        repository: {
          ...repository,
          stargazers: {
            ...query.user.repository.stargazers,
            totalCount,
          },
        }
      }
    },
  });
};

const StarThisRepo = () => {
  const [addStar] = useMutation(STAR_REPO,
    { update: updateAddStar });
  const [removeStar] = useMutation(UNSTAR_REPO,
    { update: updateRemoveStar });

  const [appear, setAppear] = useState('');

  const { loading, error, data } = useQuery(
    GET_STARS
  );

  useEffect(() => {
    setTimeout(() => setAppear('appear'), 1000);
  }, []);

  if (!data || loading || error) return null;

  const id = data.user.repository.id;
  const stars = data.user.repository.stargazers.totalCount;

  return (
    <div className={`star-container ${appear}`}>

      {!data.user.repository.viewerHasStarred ? (
        <React.Fragment>
          <p>If you appreciate what you see, do consider starring the Github Client repo by clicking the button below.</p>
          <button onClick={() => addStar({ variables: { id } })}>My pleasure.</button>
        </React.Fragment>
      ) : (
          <React.Fragment>
            <p>You can unstar the Github Client repo, but only if you promise you'll add the star again.</p>
            <button onClick={() => removeStar({ variables: { id } })}>I promise.</button>
          </React.Fragment>
        )}

      <p>Stars count: {stars}</p>
    </div>
  )
}

export default StarThisRepo;
