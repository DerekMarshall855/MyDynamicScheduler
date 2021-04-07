import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component{

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
            <h1>LOGIN</h1>
            <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Username: </label></td>
                            <td><input type="text" value={this.state.username} onChange={this.handleUsernameChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Password: </label></td>
                            <td><input type="text" value={this.state.password} onChange={this.handlePasswordChange} /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" value="Remember"/></td>
                            <td><label>Remember Me</label></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value="Log In">Login</button>
            </form>
            <p>Don't have an account? Sign up here!</p>

            <button type="button" onClick={this.handleSignUp}>Sign Up!</button>

            <div id="successful"></div>
        </div>
        );
    }
}
export default withRouter(LoginForm);