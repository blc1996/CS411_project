import mqtt from 'mqtt';
import sqlApi from '../api/sqlServer';

export const connectServer = id => {
    console.log(id);
    return async (dispatch) => {
        const options = {
            // timeout 
            connectTimeout: 4000,
        
            // 认证信息
            clientId: id,
            username: id,
            // password: 'emqx',
        
            // 心跳时间
            keepalive: 60,
            clean: true,
        }
    
        // WebSocket 连接字符串
        const WebSocket_URL = 'ws://sp19-cs411-29.cs.illinois.edu:8083/mqtt'
    
        // TCP/TLS 连接字符串，仅限 Node.js 环境
        // const TCP_URL = 'mqtt://localhost:1883'
        // const TCP_TLS_URL = 'mqtts://localhost:8883'
    
        const client = await mqtt.connect(WebSocket_URL, options);

        var connected = false;
        var err_data = null;
        client.on('connect', () => {
            console.log('连接成功')
            dispatch({
                type: "CONNECT_SERVER",
                payload: [true , err_data, client, id]
            });
        })
        
        client.on('reconnect', (error) => {
            console.log('正在重连:', error)
            err_data = error;
        })
        
        client.on('error', (error) => {
            console.log('连接失败:', error)
            err_data = error;
        })

        client.on('message', (topic, message, packet) => {
            const received = message.toString();
            console.log('收到来自', topic, '的消息:', message.toString(), "packet:", packet);
            dispatch({
                type: "UPDATE_CHAT",
                payload: {topic, message: received}
            })
        })

        dispatch({
            type: "CONNECT_SERVER",
            payload: [connected, err_data, client, id]
        });

        // //programatic nevigation
        // history.push('/');
    }
}


export const fetchChatList = (id) => {
    return async dispatch => {
        const response = await sqlApi.get(`/fetchChatList?id=${id}`);
        if(response.status === 200){
            dispatch( {
                type: "FETCT_CHAT_LIST",
                payload: response.data.msg
            });
        }
    }
}

export const fetchChatContent = (topic, id) => {
    return async dispatch => {
        const response = await sqlApi.get(`/fetchChatContent?topic=${topic}`);
        if(response.status === 200){
            dispatch( {
                type: "FETCH_CHAT_CONTENT",
                payload: [topic, response.data.data]
            });
        }
    }
}

export const publishMessage = (client, topic, message, id) => {
    var options={
        retain:true,
        qos:1};
    client.publish(topic, constructMessage(id, message), options, (err) => {
        console.log(err || '发布成功');
    })

    return {
        type: "PUBLISH_MESSAGE",
        payload: {topic: topic, message: constructMessage(id, message)}
    }
}

const constructMessage = (id, message) => {
    // id and message seperated by strange string
    return id + "|@&*&@|" + message;
}

export const subscribeTopic = (client, topic) => {
    return async dispatch => {
        client.subscribe(topic, (err) => {
            console.log(err || '订阅成功')         
            console.log(client, "******", topic)
        })

        dispatch({
            type: "SUBSCRIBE_TOPIC",
            payload: topic
        })
    }
}

export const clearNotification = (client, topic, id) => {
    var options={
        retain:true,
        qos:1};
    client.publish(topic, "", options, (err) => {
        console.log(err || 'retain eliminated');
    })
    return {
        type: "CLEAR_NOTIFICATION",
        payload: id
    };
};