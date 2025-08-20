import { useEffect, useState } from 'react';
import moment from 'moment';
import { User, ShoppingCart, Chat, Document, Category, Currency, Webhook } from "@carbon/icons-react";
import Navbar from '../../components/Navbar';
import type { GeneralStats } from '../../types/apiTypes';
import { fetchGeneralStats } from '../../utils/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
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

    // Prepare chart data for user activity
    const userActivityData = {
        labels: stats.data.userAnalysisDaily.map(day => moment(day.date).format('MMM D')), // e.g., "Aug 14"
        datasets: [
            {
                label: 'New Users',
                data: stats.data.userAnalysisDaily.map(day => day.total_count),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
            }
        ]
    };

    // Prepare chart data for item activity
    const itemActivityData = {
        labels: stats.data.itemAnalysisDaily.map(day => moment(day.date).format('MMM D')), // e.g., "Aug 14"
        datasets: [
            {
                label: 'Items Viewed',
                data: stats.data.itemAnalysisDaily.map(day => day.total_count),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily Activity',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <>
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">Dashboard Overview</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                <p className="xui-font-sz-[14px] xui-opacity-5">Welcome back, Admin</p>
                
                <div className="xui-d-grid xui-grid-col-2 xui-md-grid-col-2 xui-lg-grid-col-4 xui-grid-gap-1 xui-md-grid-gap-1 xui-mt-1">
                    <div className="xui-bg-[#193086] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <User size={14} />
                            <span className="xui-font-sz-[12px]">Total Users</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_users.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#09483A] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <ShoppingCart size={14} />
                            <span className="xui-font-sz-[12px]">Total Items</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_items.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#860317] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Chat size={14} />
                            <span className="xui-font-sz-[12px]">Total Chats</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_chat_history.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-black-switch xui-text-white-switch xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Document size={14} />
                            <span className="xui-font-sz-[12px]">Total Drafts</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_drafts.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="xui-d-grid xui-grid-col-2 xui-md-grid-col-2 xui-lg-grid-col-4 xui-grid-gap-1 xui-md-grid-gap-1 xui-mt-1">
                    <div className="xui-bg-[#4a148c] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Category size={14} />
                            <span className="xui-font-sz-[12px]">Categories</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_categories.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#006064] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Category size={14} />
                            <span className="xui-font-sz-[12px]">Business Types</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_business_types.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#e65100] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Currency size={14} />
                            <span className="xui-font-sz-[12px]">Plans</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_plans.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#33691e] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Webhook size={14} />
                            <span className="xui-font-sz-[12px]">Webhooks</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_webhooks.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="xui-row xui-mt-1">
                    <div className="xui-col-12 xui-lg-col-6 xui-lg-pr-half">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Recent User Activity</h4>
                            <div style={{ height: '300px' }}>
                                <Line options={chartOptions} data={userActivityData} />
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6 xui-lg-pl-half xui-mt-1 xui-lg-mt-0">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Item Activity</h4>
                            <div style={{ height: '300px' }}>
                                <Line options={chartOptions} data={itemActivityData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;