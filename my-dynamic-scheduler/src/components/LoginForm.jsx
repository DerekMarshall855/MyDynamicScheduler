import React from 'react';
import { withRouter } from 'react-router-dom';
import {logIn} from '../js_functions/IsLogin';
import sha1 from 'js-sha1';
import api from '../api/user_api.js';

/*
    Form for login, does authentication and remember me function
*/

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            rememberMe: false
        };
    }

    componentDidMount = async () => {
        //If user is remembered checkbox is true and username = memory
        const username = await this.getRememberedUser();
        this.setState({
            username: username || '',
            rememberMe: username ? true : false
        });
    }

    rememberUser = () => {
        localStorage.setItem("user", this.state.username);
    }

    getRememberedUser = async () => {
        const username = localStorage.getItem("user");
        if (username !== null) {
            return username;
        }
    }

    forgetUser = () => {
        localStorage.removeItem('user');
      }

    handleRememberMe = (e) => {
        //e.preventDefault(); // Prevent default made checkbox need to be double clicked, removing has not caused errors so far
        if (this.state.rememberMe) {
            e.target.checked=true;
        } else {
            e.target.checked=false;
        }
        this.setState({rememberMe: !this.state.rememberMe});
        if (this.state.rememberMe) {
            this.rememberUser();
        } else {
            this.forgetUser();
        }
    }

    handleUsernameChange = (e) => {
        e.preventDefault();
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        if(this.state.username.localeCompare('') !== 0 && this.state.password.localeCompare('') !== 0) {
            //Create json object for API call
            var obj = JSON.parse(`{"username":"${this.state.username}", "password":"${sha1(this.state.password)}"}`);
            //Authenticate/login user
            try {
                await api.authUser(obj).then(res => {
                    //User successfully authorized, set memory, set user login, reset form, go home
                    if (this.state.rememberMe) {
                        this.rememberUser();
                    } else {
                        this.forgetUser();
                    }
                    logIn(this.state.username);
                    this.setState({
                        username: '',
                        password: ''
                    });
                    this.props.history.push('/home'); //If authenticated go to home
                });
            } catch {
                window.alert('Incorrect Username or Password');
            }
        } else {
            window.alert('You must enter a valid username and password');
        }

    }

    handleSignUp = (e) => {
        e.preventDefault();
        this.props.history.push('/signuppage');
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
                    </tbody>
                </table>
                <div>
                   <input type="checkbox" value="Remember" checked={this.state.rememberMe} onChange={this.handleRememberMe}/>
                    <label>Remember Me</label> 
                </div>
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