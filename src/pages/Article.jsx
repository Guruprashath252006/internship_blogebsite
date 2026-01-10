import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogStore } from '../context/store';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export default function Article() {
    const { id } = useParams();
    const { getArticle } = useBlogStore();
    const navigate = useNavigate();

    const article = getArticle(id);

    useEffect(() => {
        if (!article && id) {
            // If article not found, maybe redirect or show error (handled in render)
        }
    }, [article, id]);

    if (!article) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Article not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="article-page">
            {article.image && (
                <div className="article-hero-image">
                    <img src={article.image} alt={article.title} />
                    <div className="overlay"></div>
                </div>
            )}

            <div className="container article-container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Articles
                </Link>

                <header className="article-header">
                    <h1 className="article-title">{article.title}</h1>
                    <div className="article-meta">
                        <span className="meta-item"><Calendar size={16} /> {new Date(article.date).toLocaleDateString()}</span>
                        <span className="meta-item"><User size={16} /> {article.author}</span>
                        <span className="meta-item"><Clock size={16} /> 5 min read</span>
                    </div>
                </header>

                <div className="article-content">
                    {article.content.split('\n').map((paragraph, index) => (
                        paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                    ))}
                </div>
            </div>

            <style jsx="true">{`
        .article-page {
          padding-bottom: 4rem;
        }

        .article-hero-image {
          width: 100%;
          height: 400px;
          position: relative;
          margin-bottom: 2rem;
        }

        .article-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .overlay {
           position: absolute;
           top: 0; left: 0; right: 0; bottom: 0;
           background: linear-gradient(to bottom, transparent 50%, var(--bg-primary));
        }

        .article-container {
           max-width: 800px;
           position: relative;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .back-link:hover {
          color: var(--accent-main);
        }

        .article-title {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #fff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .article-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }
        
        .meta-item {
           display: flex;
           align-items: center;
           gap: 0.5rem;
        }

        .article-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #e2e8f0;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
           .article-title { font-size: 2rem; }
           .article-hero-image { height: 250px; }
        }
      `}</style>
        </div>
    );
}
