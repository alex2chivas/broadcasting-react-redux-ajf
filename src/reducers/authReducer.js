import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
    // Note gapi.auth2.getAuthInstance().currentUser.get().getId()
    // This get us an unique ID for the current person logged in
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload}

        case SIGN_OUT:    
            return {...state, isSignedIn: false, userId: null}
        default:
            return state;
    }
}