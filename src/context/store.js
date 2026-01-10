import { useState, useEffect } from 'react';

const STORAGE_KEY = 'blog_articles';

const DEMO_ARTICLES = [
    {
        id: '1',
        title: 'The Future of Web Development',
        excerpt: 'Exploring the latest trends in frontend frameworks and tools.',
        content: 'Web development is constantly evolving. In this article, we look at the rise of meta-frameworks like Next.js and Remix...',
        author: 'Admin',
        date: new Date().toISOString(),
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        title: 'Understanding React Server Components',
        excerpt: 'A deep dive into how RSCs change the way we build React apps.',
        content: 'React Server Components allow us to render components on the server, reducing the bundle size sent to the client...',
        author: 'Admin',
        date: new Date(Date.now() - 86400000).toISOString(),
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
    }
];

export function useBlogStore() {
    const [articles, setArticles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setArticles(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse articles", e);
                setArticles([]);
            }
        } else {
            // Initialize with demo data
            setArticles(DEMO_ARTICLES);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ARTICLES));
        }

        // Check auth
        const auth = localStorage.getItem('is_admin_authenticated');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    const saveArticles = (newArticles) => {
        setArticles(newArticles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newArticles));
    };

    const addArticle = (article) => {
        const newArticle = { ...article, id: Date.now().toString(), date: new Date().toISOString() };
        const updated = [newArticle, ...articles];
        saveArticles(updated);
        return newArticle;
    };

    const updateArticle = (id, updatedData) => {
        const updated = articles.map(art => art.id === id ? { ...art, ...updatedData } : art);
        saveArticles(updated);
    };

    const deleteArticle = (id) => {
        const updated = articles.filter(art => art.id !== id);
        saveArticles(updated);
    };

    const getArticle = (id) => articles.find(art => art.id === id);

    const login = (password) => {
        if (password === 'admin123') { // Simple mock auth
            setIsAuthenticated(true);
            localStorage.setItem('is_admin_authenticated', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('is_admin_authenticated');
    };

    return {
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticle,
        isAuthenticated,
        login,
        logout
    };
}
