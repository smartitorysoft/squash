import getConfig from "next/config";
import axios from "axios";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "store/reducers";
import interceptors from "./interceptors";
const { BACKEND_API } = getConfig().publicRuntimeConfig;

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
    if (!window[__NEXT_REDUX_STORE__]) {
      const jsonApi = () => {
        const instance = axios.create({
          baseURL: `/api/${BACKEND_API.VERSION}`,
          headers: {
            ...headers,
            "Content-Type": "application/json"
          }
        });
        interceptors(instance);
        return instance;
      };
      const formDataApi = () => {
        const instance = axios.create({
          baseURL: `/api/${BACKEND_API.VERSION}`,
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          }
        });
        interceptors(instance);
        return instance;
      };
      const store = createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk.withExtraArgument({ jsonApi, formDataApi })))
      );
      window[__NEXT_REDUX_STORE__] = store;
    }
    return window[__NEXT_REDUX_STORE__];
  }; 

  export default makeStore;