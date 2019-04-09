import React from 'react';
import { connect } from 'react-redux';
import MarketForm from './MarketForm';

import {editItem} from '../../actions/marketAction';
import {changeTab} from '../../actions/headerAction';

import history from '../../history'

class MarketEdit extends React.Component {
    componentDidMount () {
        this.props.changeTab(1);
    }

    onSubmit = (formValues) => {
        this.props.editItem(formValues, this.props.item.id);
    }

    render () {
        if(this.props.item !== undefined){
            console.log(this.props.item)
            return (
                <div>
                    <h3>Edit this item</h3>
                    <MarketForm 
                        initialValues={{picture: this.props.item.image,title: this.props.item.title, price: this.props.item.price, description: this.props.item.description }}
                        onSubmit={this.onSubmit} 
                    />
                </div>
            );
        }else{
            return (
                <div>Illegal entry!</div>
            )
        }
        
    }
};

const mapStateToProps = state => {
    const id = history.location.pathname.split('/')[3];
    return {
        userId: state.auth.userId,
        item: state.marketList.data === undefined ? undefined : state.marketList.data.filter((item) => {return item.id.toString() === id})[0],
        itemId: id
    };
}

export default connect(mapStateToProps, {changeTab, editItem})(MarketEdit);