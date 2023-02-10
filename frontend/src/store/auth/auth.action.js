import axios from "axios";
import {  AUTH_LOGIN_LOADING, AUTH_LOGIN_ERROR,AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS, AUTH_SIGNUP_LOADING, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_ERROR, AUTH_OTP_SUCCESS, } from "./auth.types";
 
export const authLoginApi = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING})
  try {
    const res = await axios.post(`http://localhost:8080/user/login`,data);
    return dispatch({ type: AUTH_LOGIN_SUCCESS,payload:res.data})
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR})
    console.log(error.message,'this is LOGIN action');
  }
}
export const authSignupApi = (data) => async (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_LOADING})
  try {
    const res = await axios.post(`http://localhost:8080/user/signup`,data);
    return dispatch({ type: AUTH_SIGNUP_SUCCESS})
  } catch (error) {
    return dispatch({ type: AUTH_SIGNUP_ERROR})
  }
}
export const authOTP = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await axios.post(`http://localhost:8080/user/checkotp`,data);
    console.log(res.data);
    return dispatch({ type: AUTH_OTP_SUCCESS});
  } catch (error) {
    console.log(error.message);
  }
}
export const authLogoutApi = () => async (dispatch) => {
  dispatch({ type: AUTH_LOGOUT_SUCCESS})
} 






