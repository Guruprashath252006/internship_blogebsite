import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Terminal, PenTool, Layout as LayoutIcon, LogOut } from 'lucide-react';

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

            <style jsx="true">{`
        .navbar {
          background-color: rgba(22, 22, 26, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 0;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .logo-icon {
          color: var(--accent-main);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }
        
        .admin-nav {
           display: flex;
           gap: 1rem;
           align-items: center;
        }

        .main-content {
          min-height: 80vh;
          padding: 2rem 0;
        }

        .footer {
          border-top: 1px solid var(--border-color);
          padding: 2rem 0;
          text-align: center;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
        }
      `}</style>
        </div>
    );
}
