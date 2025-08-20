import { useEffect, useState } from 'react';
import { Document, ChartBar, ChartLine } from "@carbon/icons-react";
import type { GeneralStats } from '../../types/apiTypes';
import { fetchGeneralStats } from '../../utils/api';
import Navbar from '../../components/Navbar';

const ReportsPage = () => {
    const [stats, setStats] = useState<GeneralStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('weekly');

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
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">Reports</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                <div className="xui-d-flex xui-flex-ai-center xui-grid-gap-1 xui-mb-2">
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'weekly' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        <ChartBar size={16} />
                        Weekly Reports
                    </button>
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'monthly' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('monthly')}
                    >
                        <ChartLine size={16} />
                        Monthly Reports
                    </button>
                    <button 
                        className={`xui-d-flex xui-flex-ai-center xui-grid-gap-half xui-btn xui-btn-${activeTab === 'yearly' ? 'green' : 'outline'} xui-bdr-rad-half`}
                        onClick={() => setActiveTab('yearly')}
                    >
                        <Document size={16} />
                        Yearly Reports
                    </button>
                </div>

                {activeTab === 'weekly' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <ChartBar size={20} />
                            Weekly User Activity
                        </h3>
                        <div className="xui-overflow-auto">
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Week</th>
                                        <th>New Users</th>
                                        <th>Item Views</th>
                                        <th>Chats</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.userAnalysisWeekly.map((week) => (
                                        <tr key={week.week}>
                                            <td>Week {week.week?.split('-')[1]}</td>
                                            <td>{week.total_count.toLocaleString()}</td>
                                            <td>
                                                {stats.data.itemAnalysisWeekly.find(w => w.week === week.week)?.total_count.toLocaleString() || 0}
                                            </td>
                                            <td>
                                                {stats.data.chatHistoryAnalysisWeekly.find(w => w.week === week.week)?.total_count.toLocaleString() || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'monthly' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <ChartLine size={20} />
                            Monthly Statistics
                        </h3>
                        <div className="xui-overflow-auto">
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>New Users</th>
                                        <th>Item Views</th>
                                        <th>Chats</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.userAnalysisMonthly.map((month) => (
                                        <tr key={month.month}>
                                            <td>{month.month ? new Date(month.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }): "N/A"}</td>
                                            <td>{month.total_count.toLocaleString()}</td>
                                            <td>
                                                {stats.data.itemAnalysisMonthly.find(m => m.month === month.month)?.total_count.toLocaleString() || 0}
                                            </td>
                                            <td>
                                                {stats.data.chatHistoryAnalysisMonthly.find(m => m.month === month.month)?.total_count.toLocaleString() || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'yearly' && (
                    <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-2">
                        <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                            <Document size={20} />
                            Yearly Summary
                        </h3>
                        <div className="xui-overflow-auto">
                            <table className="xui-w-fluid-100 xui-table">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Total Users</th>
                                        <th>Total Items</th>
                                        <th>Total Chats</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.data.userAnalysisYearly.map((year) => (
                                        <tr key={year.year}>
                                            <td>{year.year}</td>
                                            <td>{year.total_count.toLocaleString()}</td>
                                            <td>
                                                {stats.data.itemAnalysisYearly.find(y => y.year === year.year)?.total_count.toLocaleString() || 0}
                                            </td>
                                            <td>
                                                {stats.data.chatHistoryAnalysisYearly.find(y => y.year === year.year)?.total_count.toLocaleString() || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="xui-row xui-mt-1">
                    <div className="xui-col-12 xui-md-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                                <Document size={20} />
                                Item Categories Report
                            </h3>
                            <div className="xui-overflow-auto" style={{ maxHeight: '400px' }}>
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Item Count</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_items_via_category.map((category) => (
                                            <tr key={category.Category.stripped}>
                                                <td>{category.Category.name}</td>
                                                <td>{category.total_count.toLocaleString()}</td>
                                                <td>
                                                    {((category.total_count / stats.data.total_items) * 100).toFixed(1)}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-md-col-6 xui-mt-1 xui-md-mt-0">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h3 className="xui-d-flex xui-flex-ai-center xui-grid-gap-half">
                                <Document size={20} />
                                User Business Types Report
                            </h3>
                            <div className="xui-overflow-auto" style={{ maxHeight: '400px' }}>
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Business Type</th>
                                            <th>User Count</th>
                                            <th>Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_business_type.map((business) => (
                                            <tr key={business.BusinessType?.stripped || 'unknown'}>
                                                <td>{business.BusinessType?.name || 'Unknown'}</td>
                                                <td>{business.total_count.toLocaleString()}</td>
                                                <td>
                                                    {((business.total_count / stats.data.total_users) * 100).toFixed(1)}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportsPage;