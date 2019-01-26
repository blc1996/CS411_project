import React from 'react';
import { connect } from 'react-redux';

class NevigationBar extends React.Component {
    render () {
        return (
            <div className="ui segment">
                <div className="ui two column very relaxed grid">
                <div className="column">
                <button className="ui labeled icon button">
                    <i className="left arrow icon"></i>
                    Prev
                </button>
                </div>
                <div className="column">
                <button style={{position:'absolute',right:'30px'}} className="ui right labeled icon button">
                    <i className="right arrow icon"></i>
                    Next
                </button>
                </div>
                </div>
                <div className="ui vertical divider">
                Page 1
                </div>
            </div>
        );
    } 
};

export default connect(null, {})(NevigationBar);


            