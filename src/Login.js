import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import { userAction } from './actions';

import './Login.css';

const userLoginMutation = gql`
  mutation newUser($user: UserInput!) {
    user: newUser(user: $user) {
      _id
      email
      userAvatar
    }
  }
`;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  closeLogin = (evt, shouldGoBack) => {
    evt.persist();
    this.props.userAction({close: true});
    if (this.props.history.action === 'PUSH' && shouldGoBack ){
      this.props.history.goBack();
    } 
  }

  loginRequest = () => {
    const { email, password } = this.state;
    const { mutate } = this.props;
    mutate({ 
      variables: { user: { email, password }},
    }).then(({data: { user }}) => {
      const { _id, email, userAvatar } = user;
      // this.props.userAction({ close: true, _id, email, userAvatar});
      this.setState({email: '', password: ''});
    }).catch(err => {
      // show err message
      console.log('err', err)
    });
  }

  login = (evt) => {
    evt.persist();
    evt.preventDefault();
    evt.stopPropagation();
    this.loginRequest()
  }

  componentDidMount() {
    this.loginRequest();
  }

  render() {
    const { email, password } = this.state;
    const { match, user }= this.props
    const maskDisplay = user.close === false ? 'block' : 'none';
    const upOrDown = user.close === false ? 'mask-box-up' : 'mask-box-down';
    const shouldGoBack = match.path==='/write';

    return (
      <div className={`login mask`} style={{display: `${maskDisplay}`}}>
        {
          shouldGoBack ?
          <i className='close' onClick={(evt) => this.closeLogin(evt, shouldGoBack)}>返回</i> :
          <i className="material-icons close" onClick={this.closeLogin}>close</i>
        }
        
        <div className={`mask-box ${upOrDown}`}>
        login
        <form onSubmit={this.login}>
          <div>email:</div> 
          <input  type="text" value={email} 
                  onChange={(evt) => this.setState({email: evt.target.value})}/>
          <div>password:</div>
          <input  type="text" value={password} 
                  onChange={(evt) => this.setState({password: evt.target.value})}/>
          <button>登录</button>
        </form>
        </div>
      </div>
    )
  }
}

const LoginWithMutation = graphql(
  userLoginMutation,
)(Login);

export default withRouter(connect(
  (state) => ({ user: state.user }),
  { userAction }
)(LoginWithMutation));
