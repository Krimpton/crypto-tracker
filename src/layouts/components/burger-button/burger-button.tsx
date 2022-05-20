import { useState } from 'react';
import './burger-button.scss';
import BurgerMenu from './burger-menu/burger-menu';

const BurgerButton = () => {
  const [menuActive, setMenuActive] = useState<boolean>(true);
  return (
    <div>
      <nav className="burger-nav">
        <div role="presentation" className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
          <span className="burger-line" />
        </div>
      </nav>
      <BurgerMenu active={menuActive} setActive={setMenuActive} />
    </div>
  );
};

export default BurgerButton;
