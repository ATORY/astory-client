const userAction = (user = {'_id': 'user'}) => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_STATUS', user });
  };
}

export default userAction;