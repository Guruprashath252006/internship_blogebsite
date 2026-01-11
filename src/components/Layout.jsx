import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="container navbar-content">
          <Link to="/" className="logo">
            <Terminal size={24} className="logo-icon" />
            <span>DevBlog</span>
          </Link>

          <nav className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Blog
            </Link>
            {!isAdmin ? (
              <Link to="/admin" className="btn btn-primary btn-sm">
                Admin Logic
              </Link>
            ) : (
              <div className="admin-nav">
                <Link to="/admin" className="nav-link">Dashboard</Link>
                <Link to="/" className="btn btn-outline btn-sm">
                  View Site
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} DevBlog. Built with React & Vite.</p>
        </div>
      </footer>
    </div>
  );
}
