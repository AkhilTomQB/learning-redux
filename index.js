const redux = require('redux')
const createStore= redux.legacy_createStore


const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOKCED="CAKE_RESTOKCED"

const orderCake = (quantity) => {
  //the action creator function...
  return {
    //...returns an action
    type: CAKE_ORDERED,
    quantity: quantity,
  };
};

const restockCake = (quantity) => {
    //the action creator function...
    return {
      //...returns an action
      type: CAKE_RESTOKCED,
      quantity: quantity,
    };
  };

const initstate={
    numOfCakes:10
}

// a reducer is a function that defines what happens 
// to store when action is run. one of the argument 
 

const reducer=(state=initstate,action)=>{ //is the initial state of the store and the other one is action.
    switch(action.type){
        case CAKE_ORDERED:
            return {  
                ...state,  // it return the new store
                numOfCakes:state.numOfCakes-action.quantity
            }
        case CAKE_RESTOKCED:
            return {
                ...state,
                numOfCakes:state.numOfCakes+action.quantity
            }

        default: return state    
    }
} 
 const store= createStore(reducer) // the createStore has reducer as parameter
 console.log("Initial State",store.getState()) 

 const unsubscribe=store.subscribe(()=>{
    console.log('Updated State', store.getState())
 })

 store.dispatch(orderCake(1))
 store.dispatch(orderCake(1))
 store.dispatch(orderCake(2))
 store.dispatch(restockCake(1))
unsubscribe()


