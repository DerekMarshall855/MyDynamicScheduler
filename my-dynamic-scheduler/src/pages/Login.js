import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';
import LoginForm from '../components/LoginForm.jsx';

class Login extends React.Component {

    render() {
        return (
            <div className="LoginPage">
                <Header />
                <LoginForm />
            </div>
        );
    }
}

export default withRouter(Login);