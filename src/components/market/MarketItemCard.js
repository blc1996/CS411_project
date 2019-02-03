import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MarketItemCard extends React.Component {
    render () {
        return (
            <div className="card">
            <div className="ui card">
            <div className="image">
                <img src={this.props.image} />
            </div>
            <div className="content">
                <Link to="/market/show" className="header">{this.props.title}</Link>
                <div className="meta">
                <span className="date">{this.props.date}</span>
                <br/>
                <span className="price">Listing price: ${this.props.price}</span>
                </div>
                <div className="description">
                {this.props.description}
                </div>
            </div>
            <div className="extra content">
                <a className="ui tag label">ECE</a>
                <a className="ui red tag label">ECE515</a>
                <a className="ui teal tag label">ME445</a>
            </div>
            </div>
            </div>
        );
    } 
};

export default connect(null, {})(MarketItemCard);