import React from 'react';
import './chatroom.css';
import { connect } from 'react-redux';
import { connectServer, fetchChatContent, publishMessage, clearNotification} from '../../actions/chatAction'
import {getUserInfo} from '../../actions';
import {changeTab} from '../../actions/headerAction';


const getUniqueId = (id1, id2) => {
    // id are strings
    if(id1 > id2){
        return id2+id1;
    }else{
        return id1+id2;
    }
}

class Chatroom extends React.Component {
    state = { term: "", contentLoaded: false, topic: ""};

    componentDidMount (){
        this.props.changeTab(3);
        if(!this.state.contentLoaded && this.props.auth.isSignedIn && this.props.imSystem.connected){
            if(this.state.topic === ""){
                this.setState({topic: getUniqueId(this.props.auth.user.userId, this.props.match.params.id)});
            }
            this.setState({contentLoaded: true});
            this.props.fetchChatContent(getUniqueId(this.props.auth.user.userId, this.props.match.params.id), this.props.match.params.id);
        }
    }

    componentDidUpdate (prevProps) {
        const auth = this.props.auth;
        if(auth.isSignedIn){
            if(this.state.topic === ""){
                this.setState({topic: getUniqueId(this.props.auth.user.userId, this.props.match.params.id)});
            }
            if(!this.state.connect && !this.props.imSystem.connected){
                const id = auth.user.userId;
                this.props.connectServer(id);
                this.setState({connect: true});
            }
            if(this.props.imSystem.connected && this.props.imSystem.notify[this.props.match.params.id]){
                this.props.clearNotification(this.props.imSystem.client, this.state.topic, this.props.match.params.id)
            }
        }
        if(!this.state.contentLoaded && auth.isSignedIn && this.props.imSystem.connected){
            this.setState({contentLoaded: true});
            this.props.fetchChatContent(this.state.topic, this.props.match.params.id);
        }
    }


    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.publishMessage(this.props.imSystem.client, getUniqueId(this.props.auth.user.userId,this.props.match.params.id), this.state.term, this.props.auth.user.userId);
        this.setState({term: ""});
    }

    renderForm = () => {
        return (
            <form className="send-message-form" onSubmit={this.onFormSubmit} >
                    <input 
                        type="text" 
                        value={this.state.term}
                        placeholder="Type your message and hit ENTER"
                        onChange={(e) => this.setState({ term: e.target.value })}
                    />
            </form>
        );
    };

    render () {
        const id = this.props.match.params.id;
        if(this.props.auth.userInfo[id] === undefined){
            this.props.getUserInfo(id);
        }
        const userName = this.props.auth.userInfo[id] === undefined ? id : this.props.auth.userInfo[id].username;
        const avater = this.props.auth.userInfo[id] === undefined ? id : this.props.auth.userInfo[id].ImageUrl;
        return (
            <div>
                <h1>chat with {userName}</h1>
                <img className="ui avatar image" src={avater}/>
                <MessageList 
                  getUserInfo = {this.props.getUserInfo}
                  auth = {this.props.auth}
                  id = {this.props.auth.isSignedIn ? this.props.auth.user.userId : 0}
                  messages={this.props.imSystem.chats[this.state.topic] === undefined ? [] : this.props.imSystem.chats[this.state.topic] } />
                {this.renderForm()}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        imSystem: state.imSystem,
        auth: state.auth
    }
}

class MessageList extends React.Component {

    messageDecode = (message) => {
        return message.split("|@&*&@|");
    }

    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    const temp = [message.sender, message.message];
                    const classTitle = temp[0] === this.props.id ? "messageRight" : "messageLeft";
                    return (
                      <li  key={index} className={classTitle}>
                        <div>{temp[1]}</div>
                      </li>
                    )
                })}
            </ul>
        )
    }
}

export default connect(mapStateToProps, {changeTab, getUserInfo, connectServer, fetchChatContent, publishMessage, clearNotification})(Chatroom);