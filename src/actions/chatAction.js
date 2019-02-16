import mqtt from 'mqtt';

export const connectServer = id => {
    return async (dispatch) => {
        const options = {
            // timeout 
            connectTimeout: 4000,
        
            // 认证信息
            clientId: id,
            // username: 'emqx',
            // password: 'emqx',
        
            // 心跳时间
            keepalive: 60,
            clean: true,
        }
    
        // WebSocket 连接字符串
        const WebSocket_URL = 'ws://localhost:8083/mqtt'
    
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

        dispatch({
            type: "CONNECT_SERVER",
            payload: [connected, err_data, client, id]
        });

        // //programatic nevigation
        // history.push('/');
    }
}

const getUniqueId = (id1, id2) => {
    // id are strings
    if(id1 > id2){
        return id2+id1;
    }else{
        return id1+id2;
    }
}

export const fetchChatList = (client, topic) => {
    // console.log( getUniqueId(id1,id2))
    subscribeTopic(client, topic);
    return {
        type: "FETCT_CHAT_LIST",
        payload: topic
    }
}

export const publishMessage = (client, topic, message, id) => {
    client.publish(topic, constructMessage(id, message), (err) => {
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
            client.on('message', (topic, message) => {
                console.log('收到来自', topic, '的消息:', message.toString());
                const received = message.toString();
                dispatch({
                    type: "UPDATE_CHAT",
                    payload: {topic, message: received}
                })
            })
            

        })

        dispatch({
            type: "SUBSCRIBE_TOPIC",
            payload: topic
        })
    }
}