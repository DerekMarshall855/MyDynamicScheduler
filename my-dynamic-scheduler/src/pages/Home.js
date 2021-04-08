import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';


class Home extends React.Component {



    render() {
        return (
            <div className="Home">
                <Header />
                <NavBar />
                <div className="Home-container">
                    <h1>Welcome to MyDynamicScheduler!</h1>

                </div>
            </div>
        );
    }
}

export default Home;