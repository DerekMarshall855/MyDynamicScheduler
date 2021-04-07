import React from 'react';
import NavBar from '../components/NavBar.js';
import Header from '../components/Header.js';
import { withRouter } from 'react-router-dom';


class Logout extends React.Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="Logout">
                <Header />
                <NavBar />
                <h1>Logout Page</h1>
                <p>Are you sure you would like to logout?</p>
                <button onClick={this.handleLogout}>YES</button>
            </div>
        );
    }
}

export default withRouter(Logout);