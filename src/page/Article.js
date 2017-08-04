import React from 'react';
import { Head, ArticlePreview } from '../components';

import {
  gql,
  graphql,
} from 'react-apollo';

import './Article.css';

const articleQuery = gql`

query ArticleQuery($articleId: ID!) {
  article(_id: $articleId) {
    _id
    title
    content
  }
}

`

const Article = ({ match, data: { loading, error, article } }) => {
  console.log('-----', loading, article)
  if (loading) {
    return <ArticlePreview articleId={match.params.articleId}/>
  }

  if(error) {
    return <div>{error.message}</div>
  }
  return (
    <div>
      <Head />
      <article>
        <div>{article.title}</div>
        <div>{article.content}</div>
      </article>
    </div>
  );
};

// export default Article;

export default (graphql(articleQuery, {
  options: (props) => ({
    variables: { articleId: props.match.params.articleId },
  }),
})(Article));