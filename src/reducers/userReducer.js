const userReducer = (state = {close: true}, action) => {
  if (action.type === 'USER_STATUS') {
    return action.user;
  }
  return state;
}

export default userReducer;