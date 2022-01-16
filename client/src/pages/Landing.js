import React from 'react';

import logo from '../assets/images/logo.svg';
import mainLogo from '../assets/images/main.svg';

const Landing = () => {
    return (
        <main>
            <nav>
                <img
                    src={logo}
                    className='logo'
                    alt='jobify'
                />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>
                        Cray tattooed next level chartreuse, bitters echo park pug ugh woke.
                        Flexitarian fashion axe poke activated charcoal locavore. Asymmetrical occupy master cleanse,
                        kitsch deep v distillery live-edge. Leggings wolf flannel pug meditation lumbersexual.
                        Plaid yuccie sustainable live-edge intelligentsia vaporware shaman slow-carb etsy tumeric
                        tilde air plant.
                    </p>
                    <button className="btn btn-hero">
                        Login/Register
                    </button>
                </div>
                <img
                    src={mainLogo}
                    className='img main-img'
                    alt="Main Logo"
                />
            </div>
        </main>
    );
};

export default Landing;