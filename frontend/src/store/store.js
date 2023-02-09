import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "./auth/auth.reducer";
import { hydrabadReducer } from "./data/Data.reducer";

const rootReducer = combineReducers({
    authData:authReducer,
    hydrabadData:hydrabadReducer
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))