import React from 'react';
import ScoreInput from './ScoreInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './ClassComment.css';

class ClassCommentForm extends React.Component {
    errorHandle ({ error, touched}) {
        if(touched && error){
            return (
                <div className="ui error message" >
                    <div className="header">{error}</div>
                </div>
            );
        }
    }


    renderInput = (props) => {
        // console.log(props.meta);
        const className = `field ${props.meta.error && props.meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{props.label}</label>
                <input {...props.input} autoComplete="off" />
                {this.errorHandle(props.meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        console.log(formValues, this.props.userId);
        this.props.onSubmit(formValues, this.props.userId);
    }


    render () {
        return (
            <div className="value-form">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                    <Field name="difficulty" component={ScoreInput} label="Please Indicate Difficulty level:" />
                    <Field name="workload" component={ScoreInput} label="Please Indicate Workload:" />
                    <Field name="title" component={this.renderInput} label="Enter Title:"/>
                    <Field name="comment" component={this.renderInput} label="Enter your comment :):"/>
                    <button className="ui button primary" >Submit</button>
                </form>
                <i className = {`massive ${"pencil alternate"} icon`} />
            </div>
            
        );
    } 
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = "Please enter a title!"
    }
    if(!formValues.difficulty){
        errors.difficulty = "Please select one!"
    }
    if(!formValues.workload){
        errors.workload = "Please select one!"
    }
    if(!formValues.comment){
        errors.comment = "Please enter a description!"
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'classcommentform',
    validate
})(ClassCommentForm);

const mapStateToProps = state => {
    return {userId: state.auth.user.userId};
}

export default connect(mapStateToProps, {})(formWrapped);