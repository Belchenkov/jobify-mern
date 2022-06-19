import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import mainLogo from '../assets/images/main-alternative.svg';
import Logo from '../components/Logo';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <nav>
                <Logo />
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
                    <button
                        className="btn btn-hero"
                        onClick={() => navigate('/register')}
                    >
                        Login/Register
                    </button>
                </div>
                <img
                    src={mainLogo}
                    className='img main-img'
                    alt="Main Logo"
                />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    height: var(--nav-height);
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  
  h1 {
    font-weight: 700;
    
    span {
      color: var(--primary-500);
    }
  }
  
  p {
    color: var(--grey-600);
  }
  
  .main-img {
    display: none;
  }
  
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    
    .main-img {
      display: block;
    }
  }
  
`;

export default Landing;