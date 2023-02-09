import axios from "axios";
import {  AUTH_LOGIN_LOADING, AUTH_LOGIN_ERROR,AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS, AUTH_SIGNUP_LOADING, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_ERROR, } from "./auth.types";
 
export const authLoginApi = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING})
  try {
    const res = await axios.post(`https://hydrabad-backend-task.onrender.com/user/login`,data);
    return dispatch({ type: AUTH_LOGIN_SUCCESS,payload:res.data})
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR})
    console.log(error.message,'this is LOGIN action');
  }
}
export const authSignupApi = (data) => async (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_LOADING})
  try {
    const res = await axios.post(`https://hydrabad-backend-task.onrender.com/user/signup`,data);
    return dispatch({ type: AUTH_SIGNUP_SUCCESS})
  } catch (error) {
    return dispatch({ type: AUTH_SIGNUP_ERROR})
  }
}
export const authLogoutApi = () => async (dispatch) => {
  dispatch({ type: AUTH_LOGOUT_SUCCESS})
} 






