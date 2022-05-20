import { Outlet, useNavigate } from 'react-router-dom';
import './layout.scss';

function Layout() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
      <header role="presentation" className="header" onClick={() => navigate('/coin-list')}>
        <span className="material-icons-outlined logo-icon">pages</span>
        <div className="logo-title">
          <span className="logo-word">C</span>rypto<span className="logo-word">T</span>racker
        </div>
      </header>

      <main className="main-container container-fluid justify-content-center">
        <Outlet />
      </main>

      <footer className="d-flex flex-column align-items-center justify-content-center">
        <span>
          <span className="footer-date m-lg-1">®2021</span>
          <span className="footer-date">C</span>rypto<span className="footer-date">T</span>racker
        </span>
        <div className="footer-item-block">
          <span>
            The leader in news and information on cryptocurrency, digital assets and the future of
            money.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
