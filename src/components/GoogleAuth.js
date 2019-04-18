import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '226056788165-00591ujq5uv789f7hjmvu155bb0qr55d.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn){
            var userName = this.auth.currentUser.get().getBasicProfile().getName();
            var userId = this.auth.currentUser.get().getId();
            var imageUrl = this.auth.currentUser.get().getBasicProfile().getImageUrl();
            var email = this.auth.currentUser.get().getBasicProfile().getEmail();
            console.log(this.auth.currentUser.get().getBasicProfile())
            this.props.signIn({userId:userId, userName:userName, imageUrl:imageUrl, email: email});
        }else{
            this.props.signOut();
        }
    }


    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
        this.props.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn) {
            return (
                <div>
                    <button className="ui fluid large red button" onClick={this.onSignOutClick} >
                    <i className="google icon" />
                        Sign out
                    </button>
                </div>
            )
        }else{
            return (
                <div>
                    <button className="ui fluid large teal google button" onClick={this.onSignInClick} >
                        <i className="google icon" />
                        Sign in with Google
                    </button>
                </div>
            );
        }
    }

    render () {
        console.log(this.props.isSignedIn)
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProp = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProp, {
    signIn,
    signOut
})(GoogleAuth);