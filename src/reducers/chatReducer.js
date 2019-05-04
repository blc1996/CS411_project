import sqlApi from '../api/sqlServer';
import { stat } from 'fs';

const INITIAL_STATE = {
    chats: {},
    notify: {},
    chatList: [],
    client: null,
    error: null,
    connected: false,
    id: 0
}

export default (state = INITIAL_STATE, action) => {
    if(action.type === "FETCT_CHAT_LIST"){
        return {...state, chatList: action.payload};

    }else if(action.type === "FETCH_CHAT_CONTENT"){
        const topic = action.payload[0];
        const chatContent = action.payload[1];
        return {...state, chats: {...state.chats, [topic] : chatContent}};

    }else if(action.type === "CREATE_CHAT"){
        
    }else if(action.type === "PUBLISH_MESSAGE"){
        const temp = {...state};
        const placeHolder = action.payload.message.split("|@&*&@|");
        if(temp.chats[action.payload.topic] === undefined){
            temp.chats[action.payload.topic] = [];
        }
        temp.chats[action.payload.topic].push({sender: placeHolder[0], message: placeHolder[1]});
        return temp;

    }else if(action.type === "SUBSCRIBE_TOPIC"){
        
    }else if(action.type === "CONNECT_SERVER"){
        return {...state, client: action.payload[2], error: action.payload[1], connected: action.payload[0], id: action.payload[3] }
    }else if(action.type === "UPDATE_CHAT"){
        const message = decodeMessage(action.payload.message);
        if(message[0] === state.id){
            return state;
        }
        const temp = {...state};
        if(temp.chats[action.payload.topic] === undefined){
            temp.chats[action.payload.topic] = [];
        }
        temp.chats[action.payload.topic].push({sender: message[0], message: message[1]});
        temp.notify[message[0]] = true;
        return temp;
        
    }else if(action.type === "CLEAR_NOTIFICATION"){
        const notify = {...state.notify, [action.payload]: false}
        return {...state, notify}
    }
    return state;
};

const decodeMessage = (message) => {
    // need error handling
    return message.split("|@&*&@|");
}