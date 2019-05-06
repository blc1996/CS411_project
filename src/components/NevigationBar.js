import React from 'react';
import { connect } from 'react-redux';
import { getItems,fetchItems } from '../actions/marketAction';

class NevigationBar extends React.Component {
    state = ({page: 0,mark:0})

    // constructor(props) {
    //     super(props);
    
    //     // This binding is necessary to make `this` work in the callback
    //     this.handleNextClick = this.handleNextClick.bind(this);
    //     this.handlePrevClick = this.handlePrevClick.bind(this);
    //   
        handleNextClick = () => {
            if(this.props.Mark === 0){
                    this.props.getItems(this.state.page + 8);
                    this.setState({page: this.state.page+8});
                }
            else{
                this.props.fetchItems(this.props.Title, this.state.page + 8);
                this.setState({page: this.state.page+8});
                    }
        }

        handlePrevClick = () => {
            if(this.state.page >= 8){
                if(this.props.Mark === 0){
                    this.props.getItems(this.state.page - 8);
                    this.setState({page: this.state.page-8});
                }
                else{
                    console.log(this.props.Title);
                    this.props.fetchItems(this.props.Title, this.state.page - 8);
                    this.setState({page: this.state.page-8});
                }
            }            
        }

        render () {
                return (
                    <div className="ui segment">
                        <div className="ui two column very relaxed grid">
                        <div className="column">
                        <button disabled = {this.state.page === 0}
                                className="ui labeled icon button"
                                onClick={this.handlePrevClick}>
                            <i className="left arrow icon"></i>
                            Prev
                        </button>
                        </div>
                        <div className="column">
                        <button 
                            disabled = {this.state.page +8 >= this.props.Size }
                            style={{position:'absolute',right:'30px'}} 
                            className="ui right labeled icon button"
                            onClick={this.handleNextClick}
                        >
                            <i className="right arrow icon"></i>
                            Next
                        </button>
                        </div>
                        </div> 
                        <div className="ui vertical divider">
                        Page {this.state.page/8+1}
                        </div>
                    </div>
                );
            }

};
export default connect(null, {getItems,fetchItems})(NevigationBar);


            