import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/marketAction';


class Filter extends React.Component {
    state = {title:"",mark:0,page:0};

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.fetchItems(this.state.title,this.state.page);
        this.props.changeMark(this.state.mark);
        this.props.changeTitle(this.state.title);
     };

    render () {
        return (
            <div>
                <div className="ui attached segment">
                    <form onSubmit={this.onFormSubmit} className="ui form">
                        <div className="field">
                            <label>Market Filter</label>
                            <input 
                            type="text" 
                            value = {this.state.title}
                            onChange={(e)=>this.setState({title:e.target.value,mark:1})} />
                        </div>
                    </form>
                </div>
                {/* <div className="ui bottom attached segment"></div> */}
            </div>
        );
    } 
};

export default connect(null, {fetchItems})(Filter);