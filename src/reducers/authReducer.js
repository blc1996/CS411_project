const INITIAL_STATE = {
    isSignedIn: null,
    user: null
};

export default (state = INITIAL_STATE, action) => {
    if(action.type === "SIGN_IN"){
        return {...state, isSignedIn: true, user: action.payload};
    }else if(action.type === "SIGN_OUT"){
        return {...state, isSignedIn: false, user: null};
    }
    return state;
};