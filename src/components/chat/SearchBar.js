import React from 'react';
import Modal from '../Modal'
import sqlApi from '../../api/sqlServer';

class SearchBar extends React.Component {
    state = { term: "", modal: false, searchResult: []};

    renderModal = () => {
        if(this.state.modal){
            return (
                <Modal 
                    header="Select a user" 
                    content={this.renderContent()}
                    actions={this.actions()}
                    onDismiss={() => this.setState({modal: false})}
                />
            )
        }
    }

    actions () {
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.setState({modal: false})} 
                    className="ui button" 
                >
                    Cancel
                </button>
            </React.Fragment>
        );
    };
        
    renderContent = () => {
        if(this.state.searchResult.length === 0){
            return "No such user found!";
        }else{
            console.log(this.state.searchResult);
            return (
                <div className="ui list" >
                    {this.state.searchResult.map((result, index) => {
                        return (
                            <div className="item" key={index}>
                                <img className="ui avatar image" src={result.ImageUrl} />
                                <div className="content">
                                <a className="header" onClick={() => this.props.onSubmit(result)} >{result.username}</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
        }
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        const response = await sqlApi.get(`/searchUser?username=${this.state.term}`);
        // this.props.onSubmit(this.state.term);
        this.setState({searchResult: response.data.data, modal: true});
    }

    render () {
        return (
            //onClick;onChange;onSubmit
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit} >
                    <div className="field">
                        <label>Search User</label>
                        <input type="text" 
                            value={this.state.term}
                            onChange={(e) => this.setState({ term: e.target.value })} 
                            onClick={(e) => this.setState({ term: e.target.value })} 
                        />
                    </div>
                </form>
                {this.renderModal()}
            </div>
        );
    }
}

export default SearchBar;