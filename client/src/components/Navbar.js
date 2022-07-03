import React from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar";
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    className="toggle-btn"
                    onClick={() => {}}
                >
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => {}}
                    >
                        <FaUserCircle />
                        john
                        <FaCaretDown />
                    </button>
                    <div className="dropdown show-dropdown">
                        <button
                            className="dropdown-btn"
                            type="button"
                            onClick={() => {}}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;