import axios from "axios";
import {  ADD_DATA_SUCCESS,  DELETE_DATA_SUCCESS, GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS, UPDATE_DATA_SUCCESS } from "./Data.types";
export const getDataAPI = (token) => async (dispatch) => {
    dispatch({ type: GET_DATA_LOADING });
    try { 
      const res = await axios.get(`https://hydrabad-backend-task.onrender.com/data`,{
        headers: {
            authorization: token
        }
    })
      // console.log(res,'inside Data get action')
      dispatch({ type: GET_DATA_SUCCESS, payload: res.data })
    } catch (er) {
      dispatch({ type: GET_DATA_ERROR })
    }
  } 
  export const addDataAPI = (token,data) => async (dispatch) => {
    try {
      const res = await axios.post(`https://hydrabad-backend-task.onrender.com/data`,data, {
        headers: {
            authorization: token
        }
    })
      // console.log(res,'inside Data post action',data)
      dispatch(getDataAPI(token));
      return dispatch({ type: ADD_DATA_SUCCESS, payload: res.data })
    } catch (er) {
      console.log(er)
    }
   
  }
  
  export const deleteDataAPI = (token,id) => async (dispatch) => {
    try {
      const res = await axios.delete(`https://hydrabad-backend-task.onrender.com/data/${id}`, {
        headers: {
            authorization: token
        }
    })
      dispatch(getDataAPI(token));
      return dispatch({ type: DELETE_DATA_SUCCESS })
    } catch (er) {
      console.log(er)
    }
   
  }
  export const updateDataAPI = (token,id,data) => async (dispatch) => {
    try {
      const res = await axios.patch(`https://hydrabad-backend-task.onrender.com/data/${id}`,data, {
        headers: {
            authorization: token
        }
    })
      dispatch(getDataAPI(token));
      return dispatch({ type: UPDATE_DATA_SUCCESS })
    } catch (er) {
      console.log(er)
    }
   
  }
  