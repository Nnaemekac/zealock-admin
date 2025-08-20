import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Locked } from '@carbon/icons-react';
import { login } from '../utils/auth';

const LoginPage = () => {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(apiKey)) {
            navigate('/dashboard');
        } else {
            setError('Invalid API Key');
        }
    };

    return (
        <div className="xui-max-w-[360px] xui-w-fluid-100 xui-mx-auto">
            <div className="xui-text-center xui-mb-2">
                <Locked size={32} />
                <h1 className="xui-font-sz-[28px] xui-mt-1">Zealock Admin</h1>
            </div>
            <div className="xui-mt-2 xui-md-mt-4">
                <form onSubmit={handleLogin} className="xui-form">
                    <div className="xui-form-box">
                        <label htmlFor="apiKey">API Key</label>
                        <input
                            type="password"
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            required
                        />
                        {error && <div className="xui-text-red xui-font-sz-[12px] xui-mt-half">{error}</div>}
                    </div>
                    <div className="xui-form-box">
                        <button className="xui-btn xui-btn-block xui-btn-green xui-bdr-rad-[8px] xui-font-sz-[13px] xui-py-[16px]">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;