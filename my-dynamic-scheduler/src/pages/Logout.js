import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';
import { logOut } from '../js_functions/IsLogin';
import { withRouter } from 'react-router-dom';


class Logout extends React.Component {

    handleLogout = (e) => {
        e.preventDefault();
        logOut();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="Logout">
                <Header />
                <NavBar />
                <div className="Logout-container">
                    <h1>Logout</h1>
                    <p>Are you sure you would like to logout?</p>
                    <button onClick={this.handleLogout}>YES</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Logout);