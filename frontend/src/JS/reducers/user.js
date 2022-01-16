// import types
const {
  SIGN_UP,
  SIGN_IN,
  FAIL,
  LOAD,
  CURRENT,
  LOGOUT,
} = require("../constants/user");

// initialstate
const initialState = {
  user: {},
  error: false,
  isAuth: false,
  load: false,
};

// pure function=> (state, {type,payload})=>
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD:
      return { ...state, load: true };
    //   payload:{token , msg , user }
    case SIGN_UP:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        load: false,
        isAuth: true,
      };
    //   payload: {token , msg , user}
    case SIGN_IN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        load: false,
        isAuth: true,
      };
    case FAIL:
      return { ...state, error: payload, load: false };
    case CURRENT:
      return { ...state, user: payload.user, isAuth: true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: {}, isAuth: false };
    default:
      return state;
  }
};

export default userReducer;
