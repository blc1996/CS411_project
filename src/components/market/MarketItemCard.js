import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import placeHolder from '../../placeholders/book.jpeg';

class MarketItemCard extends React.Component {
    render () {
        return (
            <div className="card">
            <div className="ui card">
            <div className="image">
                <img src={placeHolder} />
            </div>
            <div className="content">
                <Link to="/market/show" className="header">ECE515 Lecture Notes</Link>
                <div className="meta">
                <span className="date">Posted on 11:17 2/23/2019</span>
                <br/>
                <span className="price">Listing price: $5</span>
                </div>
                <div className="description">
                This is the lecture note for ECE470/ME445
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