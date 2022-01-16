import axios from "axios";
import {
  LOAD,
  SIGN_UP,
  FAIL,
  LOGOUT,
  CURRENT,
  SIGN_IN,
  GET_USER,
} from "../constants/user";

export const signUp = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post("/api/users/register", user);
    //succees action
    dispatch({ type: SIGN_UP, payload: result.data }); //{user,token,msg}
    history.push("/current");
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL, payload: error.response.data.error });
  }
};

export const signIn = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post("/api/users/login", user);

    dispatch({ type: SIGN_IN, payload: result.data }); //{msg,token,user}
    // alert(result.data.success);
    history.push(`/current`);
  } catch (error) {
    dispatch({
      type: FAIL,
      payload: error.response.data.error,
    });
  }
};

export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let { data } = await axios.get(`/api/users/current`, config);
    dispatch({ type: CURRENT, payload: data }); //{msg , user}
  } catch (error) {
    dispatch({ type: LOGOUT, payload: error.response.data.error });
  }
};

//Get user
export const getUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/users/${id}`, config);
    dispatch({ type: GET_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL});
  }
};

//edit user
export const editUser = (id, formData,history) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    await axios.put(`/api/users/edit/${id}`, formData, config);
  dispatch(current());
  history.push('/current')
  } catch (error) {
    dispatch({
      type: FAIL,
      payload: error.response.data.error,
    });
  }
};

// logout
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
