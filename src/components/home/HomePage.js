import React from 'react';
import { connect } from 'react-redux';
import UserPanel from '../UserPanel';

import GoogleAuth from '../GoogleAuth';

import {changeTab} from '../../actions/headerAction';

class HomePage extends React.Component {
    componentDidMount () {
        this.props.changeTab(0);
    }


    login = () => {
        return (
            <div>
                <p></p>
                <div className="ui middle aligned center aligned grid">
                <div className="column" style={{maxWidth: '450px'}} >
                    <h2 className="ui blue image header">
                    {/* <img src="assets/images/logo.png" className="image"/> */}
                    <div className="content">
                        Log-in to your account
                    </div>
                    <div className="content">
                        Or use Google login
                    </div>
                    </h2>
                    <form className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address"/>
                        </div>
                        </div>
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password"/>
                        </div>
                        </div>
                        <div className="ui fluid large blue submit button">Login</div>
                    </div>
                    <div className="ui error message"></div>
                    </form>
                    <GoogleAuth />

                    <div className="ui message">
                    New to us? <a href="#">Sign Up</a>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    welcome = () => {
        return (
            <UserPanel />
        )
    }

    render () {
        const content = this.props.auth.isSignedIn ? this.welcome() : this.login();
        return (
            <div>
                {content}
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {changeTab})(HomePage);