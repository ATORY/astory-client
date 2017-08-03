import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import { Head, Nav, ArticleCell } from '../components';

import './Home.css';

const ArticlesQuery = gql`

query ArticlesQuery($articleId: ID) {
  articles(_id: $articleId) {
    _id
    title
  }
}

`;

const Home = ({ match, data: { loading, error, articles } }) => {
  return (
    <div>
      <Head>
        <Nav />
      </Head>
      <div className="maxWidth articles">
      { 
        loading ? <div>Loading...</div> :
        error ? <div>{error.message}</div> : 
        articles.map( ({_id, title}) =>
        <ArticleCell key={_id} _id={_id} title={title}/>
      )}
      </div>
    </div>
  );
};


export default (graphql(ArticlesQuery)(Home));
