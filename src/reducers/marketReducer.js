const INITIAL_STATE = {
    items: []
};

export default (state = INITIAL_STATE, action) => {
    if(action.type === "FETCH_MARKET_ITEMS"){
        return action.payload;
    }else if(action.type === "DELETE_ITEM"){
        return {data: state.data.filter((item) => {return item.id !== action.payload}), page: state.page}
    }else if(action.type === "EDIT_ITEM"){

    }
    return state;
};