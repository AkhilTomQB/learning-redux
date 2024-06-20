const redux = require("redux");
const thunkMiddleware = require("redux-thunk").thunk;
const logger=require("redux-logger").createLogger()
const createStore = redux.legacy_createStore;
const axios = require("axios");
const applyMiddleware= redux.applyMiddleware

const initialState = {
  loading: true,
  data: [],
  error: "",
};

// actions
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};
const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest()) 
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        const users=res.data.map((user)=>user.id)
        dispatch(fetchUsersSuccess(users))
    }).catch(err=>{
        dispatch(fetchUsersFailed(err.msg))
    });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

console.log(store.getState())

const unsubscribe=store.subscribe(()=>{
    console.log(store.getState()) 
})

store.dispatch(fetchUsers())