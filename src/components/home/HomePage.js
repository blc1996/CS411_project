import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserPanel from '../UserPanel';

import GoogleAuth from '../GoogleAuth';

import {changeTab} from '../../actions/headerAction';
import {signIn} from '../../actions'

import sqlApi from '../../api/sqlServer';

class HomePage extends React.Component {
    state = {password: "", email: ""}

    componentDidMount () {
        this.props.changeTab(0);
    }

    onLogin = async () =>{
        console.log("here", this.state.email, this.state.password);
        const response = await sqlApi.get(`/loginUser?email=${this.state.email}&password=${this.state.password}`);
        console.log(response);
        if(response.data.cde === 200){
            const user = {...response.data.msg, email: this.state.email};
            console.log(user);
            this.props.signIn(user);
        }
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
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
                            <input type="text" name="email" placeholder="E-mail address" value={this.state.email} onChange={this.handleEmailChange} />
                        </div>
                        </div>
                        <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                        </div>
                        <div className="ui fluid large blue submit button" onClick={this.onLogin}>Login</div>
                    </div>
                    <div className="ui error message"></div>
                    </form>
                    <GoogleAuth />

                    <div className="ui message">
                    New to us? <Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps, {changeTab, signIn})(HomePage);