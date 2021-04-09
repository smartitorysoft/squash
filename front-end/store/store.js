
import getConfig from "next/config";
import { createStore, applyMiddleware, compose } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../store/reducers";

const { backendApi } = getConfig().publicRuntimeConfig;

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools
      ? composeWithDevTools
      : compose
    : null || compose;
const headers = {
  "X-Disable-Proto": "enable",
  "X-Authorization-Cookie": "true"
};

const makeStore = (initialState, ctx) => {
  
  // Create store if unavailable on the client and set it on the window object
  
    const jsonApi = () => {
      const instance = axios.create({
        baseURL: `${backendApi}`,
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        withCredentials:true
      });
      return instance;
    };
    
    const formDataApi = () => {
      const instance = axios.create({
        baseURL: `${backendApi}`,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      });
      return instance;
    };

    const store = createStore(
      reducers,
      initialState,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument({ jsonApi, formDataApi })))
      );

    
  
  return store;
};

export default makeStore;

