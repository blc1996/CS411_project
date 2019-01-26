import React from 'react';
import { connect } from 'react-redux';
import MarketForm from './MarketForm';


import {createItem} from '../../actions/marketAction';
import {changeTab} from '../../actions/headerAction';

class MarketCreate extends React.Component {
    componentDidMount () {
        this.props.changeTab(1);
    }

    onSubmit = (formValues, userId) => {
        // console.log(formValues);
        this.props.createItem({...formValues, userId: userId});
    }

    render () {
        // console.log(this.props);
        return (
            <div>
                <h3>Post a new item</h3>
                <MarketForm onSubmit={this.onSubmit} />
            </div>
        );
    } 
};

export default connect(null, {createItem, changeTab})(MarketCreate);