import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from '../components';

import {
  gql,
  graphql,
} from 'react-apollo';

export const ArticlesQuery = gql`

query ArticlesQuery($articleId: ID) {
  articles(_id: $articleId) {
    _id
    title
  }
}

`

const Home = ({ match, data: { loading, error, articles } }) => {
  if(loading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div>{error.message}</div>
  }
  return (
    <div className="home">
      <Head />
      { articles.map( article =>
        (<div key={article._id}>
          <Link to={`article/${article._id}`}>
            {article.title}
          </Link>
        </div>)
      )}
    </div>
  );
};

export default (graphql(ArticlesQuery)(Home));
