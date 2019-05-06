import React from 'react';
import ClassCommentForm from './ClassCommentForm';
import sqlApi from '../../api/sqlServer';
import history from '../../history';
import './ClassComment.css';


class ClassCommentCreate extends React.Component {
    state = {id: ""};

    componentDidMount (){
        const id = this.props.match.params.id;
        var Subject = id.match(/[a-z|A-Z]+/gi)[0] === null ? "":  id.match(/[a-z|A-Z]+/gi)[0].toUpperCase();
        var Number = id.match(/\d+$/gi) === null ? 0 : id.match(/\d+$/gi)[0];
        this.setState({id: Subject+Number});
    }

    onSubmit = async (formValues, userId) => {
        console.log(this.props);
        if(userId === undefined){
            userId = "Anounymous"
        }
        const response = await sqlApi.post(`/insertComment?user=${userId}&courseid=${this.state.id}&time=today&difficulty=${formValues.difficulty}&workload=${formValues.workload}&title=${formValues.title}&comment=${formValues.comment}`);
        console.log(response);
        history.push(`/class/${this.state.id}`);
    }

    render () {
        return (
            <div className = "comment-segment">
                <h1>{`Create a comment for ${this.state.id}`}</h1>
                <ClassCommentForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default ClassCommentCreate;