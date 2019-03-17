import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeTab} from '../../actions/headerAction';

class ClassMainPage extends Component {
    componentDidMount () {
        this.props.changeTab(2);
    }

    render () {
        return (
            <div>
                use search bar on the top right for a specific class!
            </div>
        )
    }
}

export default connect(null, {changeTab})(ClassMainPage);