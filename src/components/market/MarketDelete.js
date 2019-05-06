import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal'

import history from '../../history'

import {deleteItem} from '../../actions/marketAction';
import {changeTab} from '../../actions/headerAction';


class MarketDelete extends React.Component {
    id = history.location.pathname.split('/')[3];

    componentDidMount () {
        this.props.changeTab(1);
    }

    actions () {
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteItem(this.id)}
                    className="ui primary button" 
                >
                    Deletefe
                </button>
                <button 
                    onClick={() => history.push('/market')} 
                    className="ui button" 
                >
                    Cancel
                </button>
            </React.Fragment>
        );
    };
        
    renderContent () {
        // if(!this.props.stream) {
            return "Are you sure you want to delete this item?"
        // }
        // return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }

    render (){
        return (
            <div>
                <Modal 
                    header="Delete a Stream" 
                    content={this.renderContent()}
                    actions={this.actions()}
                    onDismiss={() => history.push('/market')}
                />
            </div>
        );
    };  
};

export default connect(null, {deleteItem, changeTab})(MarketDelete);