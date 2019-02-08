const INITIAL_STATE = {
    isSignedIn: null,
    user: null,
    userInfo: {}
};

export default (state = INITIAL_STATE, action) => {
    if(action.type === "SIGN_IN"){
        return {...state, isSignedIn: true, user: action.payload};
    }else if(action.type === "SIGN_OUT"){
        return {...state, isSignedIn: false, user: null};
    }else if(action.type === "USER_INFO"){
        return {...state, userInfo: {...state.userInfo, [action.payload.id]: action.payload}};
    }
    return state;
};