import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';


export default function Navbar() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, [loc.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    message.info('Logged out successfully');
    navigate('/');
  };

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/recommend', label: 'Recommend' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/favourites', label: 'Favourites' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-primary-900/60 border-b border-primary-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-white">Voyage</Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-4 items-center">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-2 rounded-md transition-colors ${
                loc.pathname === n.to
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-primary-700/40 text-gray-200'
              }`}
            >
              {n.label}
            </Link>
          ))}
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition text-white font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu loggedInUser={loggedInUser} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

function MobileMenu({ loggedInUser, handleLogout }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="lg:hidden relative">
      {/* Hamburger Icon */}
      <button
        aria-label="menu"
        onClick={toggleMenu}
        className="px-3 py-2 bg-primary-700/30 rounded-md text-white"
      >
        ☰
      </button>

      {/* Dark Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`absolute right-0 mt-3 bg-primary-900/95 rounded-xl border border-primary-800 w-56 p-4 transition-all duration-300 z-50 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-2 text-gray-200">
          <Link to="/" className="hover:text-indigo-400" onClick={toggleMenu}>Home</Link>
          <Link to="/packages" className="hover:text-indigo-400" onClick={toggleMenu}>Packages</Link>
          <Link to="/recommend" className="hover:text-indigo-400" onClick={toggleMenu}>Recommend</Link>
          <Link to="/dashboard" className="hover:text-indigo-400" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/about" className="hover:text-indigo-400" onClick={toggleMenu}>About</Link>
          <Link to="/contact" className="hover:text-indigo-400" onClick={toggleMenu}>Contact</Link>
          <Link to="/favourites" className="hover:text-indigo-400" onClick={toggleMenu}>Favourites</Link>

          <hr className="border-primary-700 my-2" />

          {loggedInUser ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block w-full text-center px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
