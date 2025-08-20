import { Routes, Route } from 'react-router-dom';
import { Protected } from './components/Protected';
import DashboardWrapper from './components/DashboardWrapper';
import AuthWrapper from './components/AuthWrapper';
import UsersPage from './pages/dashboard/Users';
import LoginPage from './pages/LogIn';
import AnalyticsPage from './pages/dashboard/Analytics';
import ItemsPage from './pages/dashboard/Items';
import DashboardPage from './pages/dashboard/Index';
import ReportsPage from './pages/dashboard/Reports';
import ActivityLogsPage from './pages/dashboard/ActivityLogs';

const App = () => {
    return (
            <Routes>
                <Route path="/login" element={<AuthWrapper><LoginPage /></AuthWrapper>} />
                <Route path="/dashboard" element={<Protected><DashboardWrapper /></Protected>}>
                    <Route index element={<DashboardPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="items" element={<ItemsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="logs" element={<ActivityLogsPage />} />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
    );
};

export default App;