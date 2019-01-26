import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import ImageUpload from './ImageUpload';

class MarketForm extends React.Component {
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
        console.log(formValues);
        this.props.onSubmit(formValues, this.props.userId);
    }

    render () {
        console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="picture" component={ImageUpload} label="Upload a picture for your item:" />
                <Field name="title" component={this.renderInput} label="Enter Title:"/>
                <Field name="price" component={this.renderInput} label="Enter Price:"/>
                <Field name="description" component={this.renderInput} label="Enter Description:" />
                <button className="ui button primary" >Submit</button>
            </form>
        );
    } 
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = "You must enter a title!"
    }
    if(!formValues.price){
        errors.price = "You must enter a price!"
    }
    if(isNaN(formValues.price)){
        errors.price = "You must enter a number!"
    }
    if(!formValues.description){
        errors.description = "You must enter a description!"
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'marketform',
    validate
})(MarketForm);

const mapStateToProps = state => {
    return {userId: state.auth.userId};
}

export default connect(mapStateToProps, {})(formWrapped);