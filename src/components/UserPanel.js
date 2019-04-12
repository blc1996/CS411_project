import './UserPanel.css'
import React from 'react';
import { connect } from 'react-redux';

class UserPanel extends React.Component {
    render () {
        console.log(this.props.auth)
        return (
            <div>
                <header className="panel-header">
                    <div className="info-left">
                        <img className="ui tiny circular image" src={this.props.auth.user.imageUrl} alt="placeholder" />
                    </div>
                    <div className="info-right">
                        <p>{this.props.auth.user.userName}</p>
                        <p>email: xxxx@illinois.edu</p>
                        <button className="ui button">Edit profile</button>
                        <h3>10 items | 20 comments</h3>
                    </div>
                </header>
                <div className="ui three item menu">
                    <a className="active item">Items</a>
                    <a className="item">Comments</a>
                    <a className="item">Chat Friends</a>
                </div>
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {})(UserPanel);

