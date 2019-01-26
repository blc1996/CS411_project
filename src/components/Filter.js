import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
    render () {
        return (
            <div>
                <div className="ui top attached segment">
                    <strong>Filter</strong>
                </div>
                <div className="ui attached segment">
                    To be implemented...
                </div>
                {/* <div className="ui bottom attached segment"></div> */}
            </div>
        );
    } 
};

export default connect(null, {})(Filter);