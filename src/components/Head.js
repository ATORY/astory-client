import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Head.css';
import logo from '../logo.svg';

const Head = ({ children, match }) => {
  const slogen = match.path === '/write' ? 'Draft' : 'Everyone has a story';
  return (
    <header>
      <div className="maxWidth header-bar">
        <div className='logos'>
          <Link to='/'><img src={logo} className='logo' alt="" /></Link>
          <p className='slogen'>{slogen} <Link to='/write'>Write</Link></p>
        </div>
        <div className='signs floatRight'>
          注册/登录
        </div>
      </div>
      {children}
    </header>
  );
};


export default withRouter(Head);

