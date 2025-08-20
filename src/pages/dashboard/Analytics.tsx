import { useEffect, useState } from 'react';
import LineChart from '../../components/LineChart';
import { fetchGeneralStats } from '../../utils/api';
import type { GeneralStats } from '../../types/apiTypes';
import Navbar from '../../components/Navbar';
import moment from 'moment';

const AnalyticsPage = () => {
    const [stats, setStats] = useState<GeneralStats | null>(null);
    const [loading, setLoading] = useState(true);

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

    // Prepare chart data
    const userActivityData = {
        labels: stats.data.userAnalysisDaily.map(item => moment(item.date).format("MMMM D, YYYY") as string),
        datasets: [{
            label: 'Daily Users',
            data: stats.data.userAnalysisDaily.map(item => item.total_count),
            borderColor: '#0062ff',
            backgroundColor: 'rgba(0, 98, 255, 0.1)',
        }]
    };

    const itemActivityData = {
        labels: stats.data.itemAnalysisDaily.map(item => moment(item.date).format("MMMM D, YYYY") as string),
        datasets: [{
            label: 'Daily Item Views',
            data: stats.data.itemAnalysisDaily.map(item => item.total_count),
            borderColor: '#4a148c',
            backgroundColor: 'rgba(74, 20, 140, 0.1)',
        }]
    };

    const chatActivityData = {
        labels: stats.data.chatHistoryAnalysisDaily.map(item => moment(item.date).format("MMMM D, YYYY") as string),
        datasets: [{
            label: 'Daily Chats',
            data: stats.data.chatHistoryAnalysisDaily.map(item => item.total_count),
            borderColor: '#09483A',
            backgroundColor: 'rgba(9, 72, 58, 0.1)',
        }]
    };


    return (
        <>
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">Analytics</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                <div className="xui-row">
                    <div className="xui-col-12">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">User Activity</h4>
                            <div style={{ height: '300px' }}>
                                <LineChart data={userActivityData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-row xui-mt-1">
                    <div className="xui-col-12 xui-md-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Item Activity</h4>
                            <div style={{ height: '250px' }}>
                                <LineChart data={itemActivityData} />
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-md-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Chat Activity</h4>
                            <div style={{ height: '250px' }}>
                                <LineChart data={chatActivityData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mt-1">
                    <h4 className="xui-mb-1">Chat Commands</h4>
                    <div className="xui-overflow-auto">
                        <table className="xui-w-fluid-100 xui-table">
                            <thead>
                                <tr>
                                    <th>Command</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.data.total_chat_history_via_command.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.command || 'None'}</td>
                                        <td>{item.total_count.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnalyticsPage;