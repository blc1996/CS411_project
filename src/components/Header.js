import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {changeTab} from '../actions/headerAction';
import history from '../history';

import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
    state = ({popButtonStatus: 'hidden', tern: ""})
    
    renderPopButton = (auth) => {
        if(auth.isSignedIn){
            return (
                <div 
                    onMouseOver={() => {this.setState({popButtonStatus:'visible'})}}
                    onMouseLeave={() => {this.setState({popButtonStatus:'hidden'})}}
                    className={`ui dropdown icon item ${this.state.popButtonStatus}`}
                    tabIndex="0"
                >
                    <i className="wrench icon"></i>
                    <div className={`menu transition ${this.state.popButtonStatus}`} tabIndex="-1">
                    <div className="item">
                        {`Welcome ${auth.user.userName}`}
                    </div>
        
                    <div className="divider"></div>
                    <div className="header">
                        Post
                    </div>
                    <Link to="/market/new" className="item">
                        New Item
                    </Link>
                    <Link to="/chat" className="item">
                        Chat
                    </Link>
                    </div>
                </div>
            );
        }
    };

    searchClass = () => {
        this.props.changeTab(2);
        history.push(`/class/:${this.state.term}`);
    }

    render() {
        return (
            <div className="ui top attached menu" >
                <Link to="/"
                    className={this.props.tabs[0]}
                    onClick={() => {this.props.changeTab(0)}}
                >
                    Home
                </Link>
                <Link to="/market"
                    className={this.props.tabs[1]}
                    onClick={() => {this.props.changeTab(1)}}
                >
                    Market
                </Link>
                <Link to="/class"
                    className={this.props.tabs[2]}
                    onClick={() => {this.props.changeTab(2)}}
                >
                    Classes
                </Link>
                <div className="right menu">
                    <GoogleAuth />
                    {this.renderPopButton(this.props.auth)}
                    <div className="item">
                        <div className="ui transparent icon input">
                            <input 
                                placeholder="Search for classes" 
                                value={this.state.term}
                                onChange={(e) => this.setState({ term: e.target.value })} 
                                onClick={(e) => this.setState({ term: e.target.value })} 
                                onKeyUp={event => {
                                    // console.log("here", event.key);
                                    if(event.key === "Enter"){
                                    this.searchClass();
                                }}}
                            />
                            <i className="search link icon" onClick={this.searchClass}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};



const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        tabs: state.tabs
    }
}

export default connect(mapStateToProps, {changeTab})(Header);