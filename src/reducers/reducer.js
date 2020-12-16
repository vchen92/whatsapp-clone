export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: 'SET _USER',
};

const setUser = (state, action) => {
  return { 
    ...state, 
    user: action.user, 
  };
};

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case actionTypes.SET_USER: return setUser(state, action)
    default: return state;
  }
};

export default reducer;