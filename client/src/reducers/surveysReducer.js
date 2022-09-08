import { FETCH_SURVEYS } from "../actions/types";

// state will be what this reducer return, in this case, the list of surveys
export default function(state = [], action){
    switch(action.type) {
        case FETCH_SURVEYS:
            return action.payload ;
        default:
            // return unchanged state
            return state;
    }
}