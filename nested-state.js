const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.legacy_createStore;

const initialState = {
  name: "Akhil",
  address: {
    street: "123 Main St",
    city: "Test City",
    State: "State",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (streetname) => {
  return {
    type: STREET_UPDATED,
    payload: streetname,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:

      //conventional method
      //   return {
      //     ...state,
      //     address: { ...state.address, street: action.payload },
      //   };

      // using immer 
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});
console.log("initial state", store.getState());
store.dispatch(updateStreet("new street"));
unsubscribe();
