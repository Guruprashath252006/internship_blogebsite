import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../context/store';

export default function Home() {
    const { articles } = useBlogStore();

    return (
        <div className="container">
            <div className="hero-section">
                <h1 className="hero-title">Welcome to DevBlog</h1>
                <p className="hero-subtitle">Exploring code, design, and everything in between.</p>
            </div>

            <div className="articles-grid">
                {articles.map(article => (
                    <article key={article.id} className="card article-card">
                        {article.image && (
                            <div className="card-image">
                                <img src={article.image} alt={article.title} />
                            </div>
                        )}
                        <div className="card-content">
                            <div className="card-meta">
                                <span className="meta-item"><Calendar size={14} /> {new Date(article.date).toLocaleDateString()}</span>
                                <span className="meta-item"><User size={14} /> {article.author}</span>
                            </div>
                            <h2 className="card-title">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                            </h2>
                            <p className="card-excerpt">{article.excerpt}</p>
                            <Link to={`/article/${article.id}`} className="read-more">
                                Read Article <ArrowRight size={16} />
                            </Link>
                        </div>
                    </article>
                ))}

                {articles.length === 0 && (
                    <div className="empty-state">
                        <p>No articles found. Check back later!</p>
                    </div>
                )}
            </div>

            <style jsx="true">{`
        .hero-section {
          text-align: center;
          padding: 5rem 0;
          margin-bottom: 3rem;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #94a1b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          padding-bottom: 4rem;
        }
        
        .article-card {
          padding: 0;
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }
        
        .card-image {
          height: 200px;
          overflow: hidden;
        }
        
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .article-card:hover .card-image img {
          transform: scale(1.05);
        }
        
        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .card-title {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .card-title a:hover {
          color: var(--accent-main);
        }
        
        .card-excerpt {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          flex: 1;
        }
        
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-main);
          font-weight: 600;
          margin-top: auto;
        }
        
        .empty-state {
           grid-column: 1 / -1;
           text-align: center;
           padding: 4rem;
           color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .articles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
