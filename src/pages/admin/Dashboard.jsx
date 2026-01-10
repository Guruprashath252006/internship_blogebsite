import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogStore } from '../../context/store';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

export default function Dashboard() {
    const { articles, deleteArticle, isAuthenticated, logout } = useBlogStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            deleteArticle(id);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (!isAuthenticated) return null;

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="actions">
                    <button onClick={handleLogout} className="btn btn-outline">
                        <LogOut size={18} /> Logout
                    </button>
                    <Link to="/admin/create" className="btn btn-primary">
                        <Plus size={18} /> New Article
                    </Link>
                </div>
            </div>

            <div className="dashboard-content">
                {articles.length > 0 ? (
                    <div className="article-list">
                        {articles.map(article => (
                            <div key={article.id} className="article-item card">
                                <div className="article-info">
                                    <h3>{article.title}</h3>
                                    <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
                                </div>
                                <div className="article-actions">
                                    <Link to={`/admin/edit/${article.id}`} className="btn-icon edit">
                                        <Edit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(article.id)} className="btn-icon delete">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state card">
                        <p>No articles yet. Create your first one!</p>
                    </div>
                )}
            </div>

            <style jsx="true">{`
         .dashboard-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 2rem;
           padding-bottom: 1rem;
           border-bottom: 1px solid var(--border-color);
         }
         
         .actions {
            display: flex;
            gap: 1rem;
         }

         .article-list {
           display: flex;
           flex-direction: column;
           gap: 1rem;
         }

         .article-item {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 1.5rem;
         }
         
         .article-info h3 {
           margin-bottom: 0.25rem;
           font-size: 1.25rem;
         }
         
         .article-date {
           color: var(--text-secondary);
           font-size: 0.875rem;
         }
         
         .article-actions {
            display: flex;
            gap: 0.5rem;
         }
         
         .btn-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--border-color);
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.2s;
         }
         
         .btn-icon.edit:hover {
            color: var(--accent-main);
            border-color: var(--accent-main);
         }
         
         .btn-icon.delete:hover {
            color: var(--error);
            border-color: var(--error);
         }
       `}</style>
        </div>
    );
}
