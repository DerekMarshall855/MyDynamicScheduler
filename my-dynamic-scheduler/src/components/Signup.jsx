import React from 'react';
import { withRouter } from 'react-router-dom';
import sha1 from 'js-sha1';
import api from '../api/user_api';

class Signup extends React.Component {

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

    handleFormSubmit = async (e) => {
        e.preventDefault();
        //Convert form data to json for db
        var obj = JSON.parse(`{"username":"${this.state.username}", "password":"${sha1(this.state.password)}"}`);

        //Authenticate/add user
        if(this.state.username.localeCompare('') !== 0 && this.state.password.localeCompare('') !== 0) {
            if(this.state.username.indexOf(' ') >= 0 || this.state.password.indexOf(' ') >= 0) {
                window.alert('Username and password may not include spaces');
            } else {
                try {
                    await api.getUserByName(obj.username).then(res => {
                        window.alert('user with that name already exists');
                    })
                } catch {
                    try {
                        await api.addUser(obj).then(res => {
                            //User successfully added, reset form and go to home
                            this.setState({
                                username: '',
                                password: ''
                            });
                            this.props.history.push('/'); //If authenticated go to home
                        });
                    } catch {
                        window.alert('Error, user not added');
                    }
                }
            }
        } else {
            window.alert('You must enter both a username and a password');
        }


        
        //If not, output "bad user/pass to div"
    }
    render() {
        return (
            <div className="Login">
                <h1>Sign Up Page</h1>
                <form onSubmit={this.handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type="text" value={this.state.username} onChange={this.handleUsernameChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="text" value={this.state.password} onChange={this.handlePasswordChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" value="Sign Up">Sign up</button>
                </form>

                <div id="successful"></div>
            </div>
        );
    }
}

export default withRouter(Signup);