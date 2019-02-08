import React from 'react';
import { connect } from 'react-redux'
import SearchBar from './SearchBar';
import {searchUserByName} from '../../actions';
import history from '../../history';


class ChatList extends React.Component {
    state = {chats: []}

    submitAction = (userInfo) =>{
        // this.setState({chats: [...this.state.chats, userInfo]});
        console.log(userInfo);
        history.push(`/chat/${userInfo.id}`);
    }

    render () {
        return (
            <SearchBar
                onSubmit={this.submitAction}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {searchUserByName})(ChatList);