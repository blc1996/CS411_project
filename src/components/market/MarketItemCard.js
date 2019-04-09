import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MarketItemCard extends React.Component {
    deleteAction = () => {
        this.props.deleteAction(this.props.id);
    }

    itemChange = () => {
        if(this.props.createrFlag){
            return (
                <div>
                    <div className="extra content">
                        {/* <button className="ui red button" onClick={this.deleteAction} >Delete</button> */}
                        <Link to={`/market/delete/${this.props.id}`}
                            className="ui red button"
                        >Delete</Link>
                        <Link to={`/market/edit/${this.props.id}`}
                            className="ui blue button"
                        >Edit</Link>
                    </div>
                </div>
            )
        }
    }

    render () {
        return (
            <div className="card">
            <div className="ui card">
            <div className="image">
                <img src={this.props.image} alt="item"/>
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
                {/* <a className="ui tag label">ECE</a>
                <a className="ui red tag label">ECE515</a>
                <a className="ui teal tag label">ME445</a> */}
                {this.itemChange()}
            </div>
            </div>
        );
    } 
};

export default connect(null, {})(MarketItemCard);