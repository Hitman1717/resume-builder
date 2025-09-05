import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Resume Builder', href: '/', current: location.pathname === '/' },
    { name: 'Templates', href: '/templates', current: location.pathname === '/templates' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <h1>ResumeBuilder Pro</h1>
          </Link>
        </div>
        
        <nav className="header-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${item.current ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
