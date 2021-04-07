import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        };
    }

    handleUsernameChange = (e) => {
        e.preventDefault();
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        //Authenticate
        this.props.history.push('/home'); //If authenticated
        //If not, output "bad user/pass to div"
    }

    handleSignUp = (e) => {
        e.preventDefault();
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div className="Login">
                <h1>Login Page</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    <label>Password</label>
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                    <input type="submit" value="Log In"/>
                </form>

                <button type="button" onClick={this.handleSignUp}>Sign Up!</button>

                <div id="successful"></div>
            </div>
        );
    }
}

export default withRouter(Login);