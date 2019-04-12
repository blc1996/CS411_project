import React from 'react';
import { connect } from 'react-redux';

import history from '../../history'
import sql from '../../api/sqlServer'

import {changeTab} from '../../actions/headerAction';

class MarketShow extends React.Component {
    state = {item: {}};

    componentDidMount () {
        const id = history.location.pathname.split('/')[3];
        this.props.changeTab(1);
        sql.get(`/fetchItem?id=${id}`).then(res => {
            const tempItem = res.data.data[0] === undefined ? {} : res.data.data[0];
            this.setState({item: tempItem})
        })
    }

    render () {
        console.log(this.state)
        return (
            <div>
                <div className="ui segment">
                <img className="ui centered medium image" src={this.state.item.image} alt="placeholder" />
                <p>title: {this.state.item.title}</p>
                <p>price: {this.state.item.price}</p>
                <p>description: {this.state.item.description}</p>
                <p>Post date: {this.state.item.create_time}</p>
                <p>User: {this.state.item.title}</p>
                <p>E-mail: {this.state.item.title}</p>
                </div>
            </div>
        );
    } 
};

const mapStateToProps = (state) => {
    const id = history.location.pathname.split('/')[3];
    if(state.marketList[id] === undefined){
        return {
            item: state.marketList
        }
    }else{
        return {
            item: state.marketList,
        }
    }   
}

export default connect(mapStateToProps, {changeTab})(MarketShow);