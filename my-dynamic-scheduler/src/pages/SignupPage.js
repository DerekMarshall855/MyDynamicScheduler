import React from 'react';
import { withRouter } from 'react-router-dom';
import Signup from '../components/Signup.jsx';
import Header from '../components/Header.jsx'

class SignupPage extends React.Component {

   
    render() {
        return (
            <div className="SignupPage">
                <Header />
                <Signup />
            </div>
        );
    }
}

export default withRouter(SignupPage);