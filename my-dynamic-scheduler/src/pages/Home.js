import React from 'react';
import NavBar from '../components/NavBar.js';
import Header from '../components/Header.js';


class Home extends React.Component {



    render() {
        return (
            <div className="Home">
                <Header />
                <NavBar />
            </div>
        );
    }
}

export default Home;