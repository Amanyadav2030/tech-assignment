
import { DELETE_DATA_SUCCESS, GET_DATA_SUCCESS,ADD_DATA_SUCCESS, GET_DATA_LOADING, GET_DATA_ERROR,UPDATE_DATA_SUCCESS} from "./Data.types";
const initialState = {
    data: [],
    loading:false,
    error:false,
}; 

 
export const hydrabadReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DATA_LOADING: {
            return {
                ...state,
                loading:true,
                error:false,
            }
        }
        case GET_DATA_ERROR: {
            return {
                ...state,
                loading:false,
                error:true,
            }
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state,
                loading:false,
                error:false,
                data:payload
            }
        }
        case ADD_DATA_SUCCESS: {
            return {
                ...state,
                loading:false,
                error:false
            }
        }
        case DELETE_DATA_SUCCESS: {
            return {
                ...state,
                loading:false,
                error:false
            }
        }
        case UPDATE_DATA_SUCCESS: {
            return {
                ...state,
                loading:false,
                error:false
            }
        }

        default: {
            return state
        }
    }
}