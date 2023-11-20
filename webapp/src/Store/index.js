import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import logger from 'redux-logger';
import thunk from "redux-thunk";

let middleWares = [logger, thunk];
let store = createStore(rootReducer, applyMiddleware(...middleWares));
export { store };