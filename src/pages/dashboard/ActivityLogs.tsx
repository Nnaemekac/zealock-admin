import { useEffect, useState } from 'react';
import { Activity, Chat, UserFollow, ShoppingCart } from "@carbon/icons-react";
import type { GeneralStats } from '../../types/apiTypes';
import { fetchGeneralStats } from '../../utils/api';
import Navbar from '../../components/Navbar';
import moment from 'moment';

const ActivityLogsPage = () => {
    const [stats, setStats] = useState<GeneralStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('user');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchGeneralStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div className='z-loading'>Loading...</div>;
    if (!stats) return <div className='z-loading'>No data available</div>;

    return (
        <>
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">Activity Logs</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                <div className="xui-d-flex xui-flex-ai-center xui-grid-gap-1 xui-mb-2">
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'user' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('user')}
                    >
                        <UserFollow size={16} />
                        User Activity
                    </button>
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'item' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('item')}
                    >
                        <ShoppingCart size={16} />
                        Item Activity
                    </button>
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'chat' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('chat')}
                    >
                        <Chat size={16} />
                        Chat Activity
                    </button>
                </div>

                {activeTab === 'user' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <Activity size={20} />
                            Daily User Activity
                        </h3>
                        <div className="xui-overflow-auto" style={{ maxHeight: '500px' }}>
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>New Users</th>
                                        <th>Cumulative Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.userAnalysisDaily.map((day, index) => {
                                        const cumulative = stats.data.userAnalysisDaily
                                            .slice(0, index + 1)
                                            .reduce((sum, d) => sum + d.total_count, 0);
                                        
                                        return (
                                            <tr key={day.date}>
                                                <td>{moment(day.date).format("MMMM D, YYYY")}</td>
                                                <td>{day.total_count.toLocaleString()}</td>
                                                <td>{cumulative}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'item' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <Activity size={20} />
                            Item View History
                        </h3>
                        <div className="xui-overflow-auto" style={{ maxHeight: '500px' }}>
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Views</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.itemAnalysisDaily.map((day) => (
                                        <tr key={day.date}>
                                            <td>{moment(day.date).format("MMMM D, YYYY")}</td>
                                            <td>{day.total_count.toLocaleString()}</td>
                                            <td>
                                                {stats.data.total_item_history_via_action
                                                    .filter(a => a.action.includes('VIEW'))
                                                    .reduce((sum, a) => sum + a.total_count, 0)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <Activity size={20} />
                            Chat Command History
                        </h3>
                        <div className="xui-overflow-auto" style={{ maxHeight: '500px' }}>
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Command</th>
                                        <th>Count</th>
                                        <th>Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.total_chat_history_via_command.map((cmd) => (
                                        <tr key={cmd.command || 'none'}>
                                            <td>{cmd.command || 'None'}</td>
                                            <td>{cmd.total_count.toLocaleString()}</td>
                                            <td>
                                                {((cmd.total_count / stats.data.total_chat_history) * 100).toFixed(1)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                    <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                        <Activity size={20} />
                        Recent Activity Summary
                    </h3>
                    <div className="xui-row">
                        <div className="xui-col-12 xui-md-col-4">
                            <div style={{borderColor: '#797979'}} className="xui-p-1 xui-bdr-w-1 xui-bdr-s-solid xui-d-flex xui-flex-dir-column xui-grid-gap-1">
                                <h4 className="xui-d-flex xui-font-w-500 xui-flex-ai-center xui-grid-gap-half xui-p-half xui-bg-green xui-bdr-rad-half xui-text-white">
                                    <UserFollow size={16} />
                                    User Signups
                                </h4>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.userAnalysisDaily.slice(-1)[0].total_count.toLocaleString()} new users today
                                </p>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.userAnalysisWeekly.slice(-1)[0].total_count.toLocaleString()} this week
                                </p>
                            </div>
                        </div>
                        <div className="xui-col-12 xui-md-col-4 xui-pl-1">
                            <div style={{borderColor: '#797979'}} className="xui-p-1 xui-bdr-w-1 xui-bdr-s-solid xui-d-flex xui-flex-dir-column xui-grid-gap-1">
                                <h4 className="xui-d-flex xui-font-w-500 xui-flex-ai-center xui-grid-gap-half xui-p-half xui-bg-green xui-bdr-rad-half xui-text-white">
                                    <ShoppingCart size={16} />
                                    Item Views
                                </h4>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.itemAnalysisDaily.slice(-1)[0].total_count.toLocaleString()} views today
                                </p>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.itemAnalysisWeekly.slice(-1)[0].total_count.toLocaleString()} this week
                                </p>
                            </div>
                        </div>
                        <div className="xui-col-12 xui-md-col-4 xui-pl-1">
                            <div style={{borderColor: '#797979'}} className="xui-p-1 xui-bdr-w-1 xui-bdr-s-solid xui-d-flex xui-flex-dir-column xui-grid-gap-1">
                                <h4 className="xui-d-flex xui-font-w-500 xui-flex-ai-center xui-grid-gap-half xui-p-half xui-bg-green xui-bdr-rad-half xui-text-white">
                                    <Chat size={16} />
                                    Chat Activity
                                </h4>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.chatHistoryAnalysisDaily.slice(-1)[0].total_count.toLocaleString()} chats today
                                </p>
                                <p className="xui-font-sz-[14px]">
                                    {stats.data.chatHistoryAnalysisWeekly.slice(-1)[0].total_count.toLocaleString()} this week
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityLogsPage;