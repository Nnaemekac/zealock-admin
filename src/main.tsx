import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { apply } from "@richaadgigi/stylexui";
import "@richaadgigi/stylexui/css/xui.css"
import "./assets/css/style.css"
import { BrowserRouter } from 'react-router';

apply();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)
