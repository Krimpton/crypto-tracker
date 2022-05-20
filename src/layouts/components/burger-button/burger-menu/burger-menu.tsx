import './burger-menu.scss';
import WatchListComponent from '../../watch-list/watch-list-component';

const BurgerMenu = ({ active }: any, { setActive }: any) => {
  return (
    <div
      role="presentation"
      className={active ? 'burger-menu active-burger' : 'burger-menu'}
      onClick={() => setActive(false)}
    >
      <div role="presentation" className="burger-content" onClick={(e) => e.stopPropagation()}>
        <div className="burger-header">Watch List</div>
        <div className="burger-item-wrapper d-flex justify-content-start">
          <div className="burger-item">
            <WatchListComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
