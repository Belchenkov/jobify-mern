import React from 'react';

import { FaHome } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
    return (
        <Wrapper>
            <FaHome />
            <h4>Navbar</h4>
        </Wrapper>
    );
};

export default Navbar;