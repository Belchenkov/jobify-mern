import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import Navbar from "../../components/Navbar";
import BigSidebar from "../../components/BigSidebar";
import SmallSidebar from "../../components/SmallSidebar";

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

export default SharedLayout;