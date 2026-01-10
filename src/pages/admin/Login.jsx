import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogStore } from '../../context/store';
import { Lock } from 'lucide-react';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useBlogStore();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin');
        } else {
            setError('Invalid password. Try "admin123"');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '10vh' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '50px', height: '50px', background: 'var(--bg-tertiary)',
                        borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-main)'
                    }}>
                        <Lock size={24} />
                    </div>
                    <h2>Admin Access</h2>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="password"
                            placeholder="Enter password (admin123)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
