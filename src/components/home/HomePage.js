import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render () {
        return (
            <div>
                <div className="ui placeholder">
                <div className="image header">
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="paragraph">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                </div>
                Homepage to be implemented...
            </div>
        );
    } 
};

export default connect(null, {})(HomePage);