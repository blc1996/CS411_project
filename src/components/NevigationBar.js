import React from 'react';
import { connect } from 'react-redux';
import { getItems,fetchItems } from '../actions/marketAction';
import sqlApi from '../api/sqlServer'

class NevigationBar extends React.Component {
    state = ({page: 0,mark:0})

    // constructor(props) {
    //     super(props);
    
    //     // This binding is necessary to make `this` work in the callback
    //     this.handleNextClick = this.handleNextClick.bind(this);
    //     this.handlePrevClick = this.handlePrevClick.bind(this);
    //   
        handleNextClick = (title) => {
            if(this.props.Mark === 0){
                sqlApi.get(`/getSize`).then(res => {
                    const tempItem = res.data.data[0] === undefined ? {} : res.data.data[0];
                    if(this.state.page+4 < tempItem.SIZE){
                        this.props.getItems(this.state.page + 4);
                        this.setState({page: this.state.page+4});
                    }
                })
            }
            else{
                console.log(title);
                sqlApi.get(`/fetchSize?title=${title}`).then(res => {
                    const tempItem = res.data.data[0] === undefined ? {} : res.data.data[0];
                    console.log(tempItem);
                    if(this.state.page+4 < tempItem.SIZE){
                    this.props.fetchItems(this.props.Title, this.state.page - 4);
                    this.setState({page: this.state.page+4});
                    }
                })
            }
        }

        handlePrevClick = () => {
            if(this.state.page > 0){
                if(this.props.Mark === 0){
                    this.props.getItems(this.state.page - 4);
                    this.setState({page: this.state.page-4});
                }
                else{
                    console.log(this.props.Title);
                    this.props.fetchItems(this.props.Title, this.state.page - 4);
                    this.setState({page: this.state.page-4});
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
                                onClick={this.handlePrevClick(this.props.Title)}>
                            <i className="left arrow icon"></i>
                            Prev
                        </button>
                        </div>
                        <div className="column">
                        <button 
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
                        Page 1
                        </div>
                    </div>
                );
            }

};
export default connect(null, {getItems,fetchItems})(NevigationBar);


            