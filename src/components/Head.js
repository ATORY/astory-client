import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { gql, graphql, compose, withApollo } from 'react-apollo';

import { userAction } from '../actions';

import './Head.css';
import logo from '../logo.svg';
import account from '../account_circle.svg';

// const authQuery = gql`
// query auth {
//   user: auth {
//     _id
//     email
//     userAvatar
//   }
// }
// `;

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
    this.props.userAction({close: false});
  }
  render() {
    const { children, match, client } = this.props;
    const apolloStore = client.store;
    const applloState = apolloStore.getState();
    console.log(applloState)
    const slogen = 'Everyone has a story';
    return (
      <header>
        <div className="maxWidth header-bar">
          <div className='logos'>
            <Link to='/'><img src={logo} className='logo' alt="" /></Link>
            <p className='slogen'>{slogen}</p>
          </div>
          {/* 
            data.loading ? 'authing...' :
            data.auth && data.auth._id ? <UserHead user={data.auth} /> :
          */}
            <div className='signs floatRight'>
              <div><Link to='/write'>Write</Link></div>
              <div className='btns'>
                <button onClick={this.loginShow}>登录</button>
              </div>
            </div> 
        </div>
        {children}
      </header>
    );
  }
};

// const HeadWithData = graphql(authQuery)(Head)

// export default (connect(
//   (state) => ({ user: state.user }),
//   { userAction }
// )(HeadWithData));

// port { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
export default withApollo(
  connect(
    (state) => ({ user: state.user }),
    { userAction }
  )(Head)
);

