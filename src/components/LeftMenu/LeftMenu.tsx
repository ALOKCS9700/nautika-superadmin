import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LeftMenu: React.FC = () => {
    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);
    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="bg-login-imageIcon" />
                </Link>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    NautikaHouse
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/BlogManagement`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Blog Management</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/IslandsManagement`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Islands Management</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/TestimonialsManagement`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Testimonials Management</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/GalleryManagement`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Gallery Management</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
