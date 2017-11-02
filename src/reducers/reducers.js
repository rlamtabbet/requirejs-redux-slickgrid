define(["redux"], function(Redux) {
  "use strict";

  const errorReducer = (state = {}, action) => {
    switch (action.type) {
      case "500":
        return { ...state, name: action.payload };
      case "404":
        return { ...state, handle: action.payload };
      case "ERR":
        throw new Error(action.payload);
      default:
        return state;
    }
  };

  const userReducer = (state = {}, action) => {
    switch (action.type) {
      case "CHANGE_NAME":
        return { ...state, name: action.payload };
      case "CHANGE_HANDLE":
        return { ...state, handle: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    pending: false,
    fetched: false,
    error: null,
    repos: []
  };

  const reposReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_REPOS_PENDING":
        return { ...state, pending: true, fetched: false };
      case "FETCH_REPOS_FULFILLED":
        return {
          ...state,
          pending: false,
          fetched: true,
          repos: action.payload
        };
      case "FETCH_REPOS_REJECTED":
        return {
          ...state,
          pending: false,
          error: action.payload
        };
      case "REMOVE_REPOS":
        return [];
      default:
        return state;
    }
  };

  const reducers = Redux.combineReducers({
    error: errorReducer,
    user: userReducer,
    repos: reposReducer
  });

  return reducers;
});
