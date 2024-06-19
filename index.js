const redux = require('redux')
const createStore= redux.legacy_createStore


const CAKE_ORDERED = "CAKE_ORDERED";

const orderCake = () => {
  //the action creator function...
  return {
    //...returns an action
    type: CAKE_ORDERED,
    quantity: 1,
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
                numOfCakes:state.numOfCakes-1
            }
        default: return state    
    }
} 
 const store= createStore(reducer) // the createStore has reducer as parameter
 console.log("Initial State",store.getState()) 

 const unsubscribe=store.subscribe(()=>{
    console.log('Updated State', store.getState())
 })

 store.dispatch(orderCake())
 store.dispatch(orderCake())
 store.dispatch(orderCake())
unsubscribe()

