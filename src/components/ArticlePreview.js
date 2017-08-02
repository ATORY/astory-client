import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import Head from './Head';

const ArticlePreview = ({data: { loading, error, article }}) => {
  return (
    <div>
      <Head />
      <article>
        <div>{article && article.title}</div>
        <div>Loading....</div>
      </article>
    </div>
  )
}

export const articleQuery = gql`
  query ArticleQuery($articleId : ID!) {
    article(_id: $articleId) {
      _id
      title
    }
  }
`;
export default (graphql(articleQuery, {
  options: (props) => ({
    variables: { articleId: props.articleId },
  }),
})(ArticlePreview));