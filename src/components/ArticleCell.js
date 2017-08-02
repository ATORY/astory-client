import React from 'react';
import { Link } from 'react-router-dom';

import './ArticleCell.css';

const ArticleCell = ({ _id, title}) => {
  return (
    <div className='article-cell'>
      <div>
        <Link to={`article/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <p>content</p>
      </div>
    </div>
  )
}

export default ArticleCell;