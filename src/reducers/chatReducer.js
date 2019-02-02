const INITIAL_STATE = {
    chats: {},
    client: null,
    error: null,
    connected: false,
    id: 0
}

export default (state = INITIAL_STATE, action) => {
    if(action.type === "FETCT_CHAT_LIST"){
        // need to be modified
        // console.log(action.payload, "*&%*&^*&^*&^"); 
        return {...state, chats: {...state["chats"], [action.payload]: [] } }
    }else if(action.type === "FETCH_CHAT_CONTENT"){
        
    }else if(action.type === "CREATE_CHAT"){
        
    }else if(action.type === "PUBLISH_MESSAGE"){
        const temp = {...state};
        console.log(temp.chats);
        temp.chats[action.payload.topic].push(action.payload.message);
        return temp;
    }else if(action.type === "SUBSCRIBE_TOPIC"){
        
    }else if(action.type === "CONNECT_SERVER"){
        return {...state, client: action.payload[2], error: action.payload[1], connected: action.payload[0], id: action.payload[3] }
    }else if(action.type === "UPDATE_CHAT"){
        const message = decodeMessage(action.payload.message);
        console.log(message);
        console.log(state);
        if(message[0] === state.id){
            return state;
        }
        const temp = {...state};
        temp.chats[action.payload.topic].push(action.payload.message);
        return temp; 
    }
    return state;
};

const decodeMessage = (message) => {
    // need error handling
    return message.split("|@&*&@|");
}