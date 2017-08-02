import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';


const ArticlePreview = ({data: { loading, error, article }}) => {
  return (
    <div>
      <div className="articleName">
        {article ? article.title : 'Loading....'}
      </div>

      <div>Loading....</div>
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