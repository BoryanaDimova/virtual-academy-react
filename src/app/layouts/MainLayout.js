import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MainLayout.css';

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-main">
                {/*// <!--Navbar -->*/}
                <nav className="navbar navbar-expand-lg navbar-dark">
                    {/*// <!-- Brand -->*/}
                    <Link className="navbar-brand" to={"/"}>Virtual Academy</Link>
                    {/*// <!--/.Brand -->*/}

                    {/*// <!-- Collapse -->*/}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {/*// <!--/.Collapse -->*/}

                    {/*// <!-- Links -->*/}
                    <div className="collapse navbar-collapse" id="navbarContent">

                        {/*// <!-- Left -->*/}
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link waves-effect waves-light"  to="/admin-panel">Admin
                                    Panel</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link waves-effect waves-light" to="/courses-cards-list">All
                                    Courses
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link className="nav-link waves-effect waves-light" to="/favourite-courses">Favourite*/}
                            {/*        Courses</Link>*/}
                            {/*</li>*/}

                        </ul>

                    </div>
                    {/*// <!--/.Links -->*/}
                </nav>
                {/*// <!--/.Navbar -->*/}
                <div className="container justify-content-center mt-4">
                    {this.props.children}
                </div>
            </div>

        )
    }
}

export default MainLayout;
