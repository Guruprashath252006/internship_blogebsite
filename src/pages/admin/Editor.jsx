import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBlogStore } from '../../context/store';
import { ArrowLeft, Save } from 'lucide-react';

export default function Editor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addArticle, updateArticle, getArticle, isAuthenticated } = useBlogStore();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: 'Admin'
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
            return;
        }

        if (id) {
            const article = getArticle(id);
            if (article) {
                setFormData(article);
            } else {
                navigate('/admin'); // Article not found
            }
        }
    }, [id, isAuthenticated, navigate, getArticle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateArticle(id, formData);
        } else {
            addArticle(formData);
        }
        navigate('/admin');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <div className="editor-header">
                <Link to="/admin" className="back-link">
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>
                <h1>{id ? 'Edit Article' : 'Create New Article'}</h1>
            </div>

            <div className="editor-container card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Article Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a catchy title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cover Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            placeholder="A brief summary for the homepage..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Content (Markdown supported conceptually but plain text for now)</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={15}
                            placeholder="Write your article content here..."
                            required
                            style={{ fontFamily: 'monospace', fontSize: '1rem' }}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/admin')} className="btn btn-outline">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} /> {id ? 'Update Article' : 'Publish Article'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx="true">{`
        .editor-header {
           margin-bottom: 2rem;
        }
        
        .back-link {
           display: inline-flex;
           align-items: center;
           gap: 0.5rem;
           color: var(--text-secondary);
           margin-bottom: 1rem;
        }
        
        .back-link:hover {
           color: var(--accent-main);
        }

        .editor-container {
           max-width: 800px;
           margin: 0 auto;
        }
        
        .form-group {
           margin-bottom: 1.5rem;
        }
        
        .form-group label {
           display: block;
           margin-bottom: 0.5rem;
           font-weight: 500;
           color: var(--text-secondary);
        }
        
        .form-actions {
           display: flex;
           justify-content: flex-end;
           gap: 1rem;
           margin-top: 2rem;
           padding-top: 1.5rem;
           border-top: 1px solid var(--border-color);
        }
      `}</style>
        </div>
    );
}
