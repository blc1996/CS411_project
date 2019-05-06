import React from 'react';
import ClassCommentForm from './ClassCommentForm';
import sqlApi from '../../api/sqlServer';
import history from '../../history';
import './ClassComment.css';


class ClassCommentCreate extends React.Component {
    state = {id: ""};

    Months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sept",
        9: "Ocu",
        10: "Nov",
        11: "Dec",
    } //emulated enum for months

    componentDidMount (){
        const id = this.props.match.params.id;
        var Subject = id.match(/[a-z|A-Z]+/gi)[0] === null ? "":  id.match(/[a-z|A-Z]+/gi)[0].toUpperCase();
        var Number = id.match(/\d+$/gi) === null ? 0 : id.match(/\d+$/gi)[0];
        this.setState({id: Subject+Number});
    }

    onSubmit = async (formValues, userId) => {
        if(userId === undefined){
            userId = "Anounymous"
        }
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const response = await sqlApi.post(`/insertComment?user=${userId}&courseid=${this.state.id}&time=${`${this.Months[month]}. ${date}`}&difficulty=${formValues.difficulty}&workload=${formValues.workload}&title=${formValues.title}&comment=${formValues.comment}`);
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