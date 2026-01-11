import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../context/store';
import './Home.css';

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
    </div>
  );
}
