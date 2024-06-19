const redux = require('redux')
const createStore= redux.legacy_createStore
const combineReducers= redux.combineReducers


const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED="CAKE_RESTOCKED"
const ICECREAM_ORDERED="ICECREAM_ORDERED"
const ICECREAM_RESTOCKED="ICECREAM_RESTOCKED"


const orderCake = (quantity) => {
  //the action creator function...
  return {
    //...returns an action
    type: CAKE_ORDERED,
    payload: quantity,
  };
};

const restockCake = (quantity) => {
    //the action creator function...
    return {
      //...returns an action
      type: CAKE_RESTOCKED,
      payload: quantity,
    };
  };
  const orderIcecream = (quantity) => {
    //the action creator function...
    return {
      //...returns an action
      type: ICECREAM_ORDERED,
      payload: quantity,
    };
  };
  
  const restockIcecream = (quantity) => {
      //the action creator function...
      return {
        //...returns an action
        type: ICECREAM_RESTOCKED,
        payload: quantity,
      };
    };
  
const initIcecreamState={
    numOfIcecreams:25,
}
const initCakeState={
    numOfCakes:10,
}

// a reducer is a function that defines what happens 
// to store when action is run. one of the argument 
 

const cakeReducer=(state=initCakeState,action)=>{ //is the initial state of the store and the other one is action.
    switch(action.type){
        case CAKE_ORDERED:
            return {  
                ...state,  // it return the new store
                numOfCakes:state.numOfCakes-action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes:state.numOfCakes+action.payload
            }
        default: return state    
    }
} 
const iceCreamReducer=(state=initIcecreamState,action)=>{ //is the initial state of the store and the other one is action.
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecreams:state.numOfIcecreams-action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecreams:state.numOfIcecreams+action.payload
            }

        default: return state    
    }
} 

const rootReducer= combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})


 const store= createStore(rootReducer) // the createStore has reducer as parameter
 console.log("Initial State",store.getState()) 

 const unsubscribe=store.subscribe(()=>{
    console.log('Updated State', store.getState())
 })

 store.dispatch(orderCake(1))
 store.dispatch(orderCake(1))
 store.dispatch(orderCake(2))
 store.dispatch(restockCake(1))
 store.dispatch(orderIcecream(3))
 store.dispatch(restockIcecream(5))
unsubscribe()


