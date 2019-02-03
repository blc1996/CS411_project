const INITIAL_STATE = {
    items: []
};

export default (state = INITIAL_STATE, action) => {
    if(action.type === "FETCH_MARKET_ITEMS"){
        return action.payload;
    }else if(action.type === "SIGN_OUT"){
        // return {...state, isSignedIn: false, user: null};
    }
    return state;
};