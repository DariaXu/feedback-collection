import { FETCH_USER } from '../actions/types'

// input current state, then change the state
export default function(state = null, action){
    console.log(action);
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            // return unchanged state
            return state;
    }
}