import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {searchUserByName} from '../../actions';
import { connectServer, fetchChatList, publishMessage, subscribeTopic } from '../../actions/chatAction'
import {changeTab} from '../../actions/headerAction';
import sqlApi from '../../api/sqlServer';

const getUniqueId = (id1, id2) => {
    // id are strings
    if(id1 > id2){
        return id2+id1;
    }else{
        return id1+id2;
    }
}

class ChatList extends React.Component {
    state = {connect: false, chatLoaded: false}
    componentDidMount () {
        this.props.changeTab(3);
    }

    componentDidUpdate () {
        const auth = this.props.auth;
        if(auth.isSignedIn){
            if(!this.state.connect && !this.props.imSystem.connected){
                const id = auth.user.userId;
                this.props.connectServer(id);
                this.setState({connect: true});
            }
        }
    }

    getChatList = async () => {
        this.props.fetchChatList(this.props.auth.user.userId);
        this.setState({chatLoaded: true});
    }

    submitAction = async (userInfo) =>{
        // this.setState({chats: [...this.state.chats, userInfo]});
        console.log(userInfo, this.props.auth);
        if(this.props.auth.isSignedIn){
            await sqlApi.post(`/subscribeTopic?id=${userInfo.id}&topic=${getUniqueId(this.props.auth.user.userId, userInfo.id)}`);
            await sqlApi.post(`/subscribeTopic?id=${this.props.auth.user.userId}&topic=${getUniqueId(this.props.auth.user.userId, userInfo.id)}`);
            this.getChatList();
        }else{
            console.log("please login first.");
        }
        // history.push(`/chat/${userInfo.id}`);
    }

    renderNotification = (flag) =>{
        if(flag){
            return <i className="bell icon"></i>;
        }
    }

    renderList = () => {
        if(this.props.auth.isSignedIn && !this.state.chatLoaded){
            this.getChatList();
        }
        return this.props.imSystem.chatList.map(chat => {
            if(chat === undefined){
                return;
            }
            return (
                <div className="item">
                    <div className="right floated content">
                    {this.renderNotification(this.props.imSystem.notify[chat.id])}
                    <div className="ui button">Delete</div>
                    </div>
                    <img className="ui avatar image" src={chat.ImageUrl}/>
                    <div className="content">
                        <Link to={`/chat/${chat.id}`}>
                            {chat.username}
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render () {
        return (
            <div>
                <SearchBar
                    onSubmit={this.submitAction}
                />
                History Chat List
                <div className="ui list">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        imSystem: state.imSystem
    }
}

export default connect(mapStateToProps, {searchUserByName, connectServer, changeTab, fetchChatList})(ChatList);