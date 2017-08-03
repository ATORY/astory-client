import React from 'react';
import { 
  // withRouter, 
  Link 
} from 'react-router-dom';
import { gql, graphql, 
  // compose, withApollo 
} from 'react-apollo';

// import { userAction } from '../actions';

import './Head.css';
import logo from '../logo.svg';
import account from '../account_circle.svg';

import { authQuery } from '../querys';


const UserHead = ({user: { _id, email, userAvatar }}) => {
  return (
    <div className='user-head floatRight'>
      <div><Link to='/write'>Write</Link></div>
      <div className='user-head-info'>
        <span>{email}</span>
        <img src={userAvatar || account} alt=""/>
      </div>
    </div> 
  )
}

class Head extends React.Component {
  
  loginShow = (evt) => {
    evt.persist()
    const loginMask = document.getElementById('login-mask');
    loginMask.style.display = 'block';
  }
  render() {
    const { children, data } = this.props;
    const slogen = 'Everyone has a story';
    return (
      <header>
        <div className="maxWidth header-bar">
          <div className='logos'>
            <Link to='/'><img src={logo} className='logo' alt="" /></Link>
            <p className='slogen'>{slogen}</p>
          </div>
          {
            data.loading ? 'authing...' :
            data.user && data.user._id ? <UserHead user={data.user} /> :
            <div className='signs floatRight'>
              <div><Link to='/write'>Write</Link></div>
              <div className='btns'>
                <button onClick={this.loginShow}>登录</button>
              </div>
            </div> 
          }
        </div>
        {children}
      </header>
    );
  }
};

export default graphql(authQuery)(Head)

// export default (connect(
//   (state) => ({ user: state.user }),
//   { userAction }
// )(HeadWithData));

// port { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// export default withApollo(
//   connect(
//     (state) => ({ user: state.user }),
//     { userAction }
//   )(Head)
// );

