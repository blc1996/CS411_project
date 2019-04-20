import React from 'react';
import SignUpForm from './SignUpForm';

import sqlApi from '../../api/sqlServer'
import history from '../../history'


class SignUpPage extends React.Component {
    state = {id: ""};

    componentDidMount (){
        
    }

    onSubmit = async (formValues) => {
        console.log(formValues);
        const response = await sqlApi.post(`/signUpUser?email=${formValues.email}&userName=${formValues.UserName}&password=${formValues.Password}`);
        console.log(response);
        if(response.data.cde === 200){
            history.push('/');
        }else{
            console.log(response.data.cde, response.data.msg);
        }
    }

    render () {
        return (
            <div>
                <SignUpForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default SignUpPage;