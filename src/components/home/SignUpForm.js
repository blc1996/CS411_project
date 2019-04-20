import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SignUpForm extends React.Component {
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
        // console.log(props);
        const className = `field ${props.meta.error && props.meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{props.label}</label>
                <input type={props.type} {...props.input} autoComplete="off" />
                {this.errorHandle(props.meta)}
            </div>
        );
    }

    onSubmit = async (formValues) => {
        this.props.onSubmit(formValues);
    }


    render () {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="email" component={this.renderInput} label="Please enter email: "/>
                <Field name="UserName" component={this.renderInput} label="Please enter your user name: " />
                <Field name="Password" type="password" component={this.renderInput} label="Please enter password: " />
                <button className="ui button primary" >Submit</button>
            </form>
        );
    } 
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.UserName){
        errors.UserName = "You must enter a user name!"
    }
    if(!formValues.Password){
        errors.Password = "Invalid Password"
    }
    if(!formValues.email){
        errors.email = "You must enter a email!"
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'signupform',
    validate
})(SignUpForm);

export default formWrapped;