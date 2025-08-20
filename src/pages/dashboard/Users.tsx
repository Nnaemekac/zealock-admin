import { useEffect, useState } from 'react';
import type { GeneralStats } from '../../types/apiTypes';
import { fetchGeneralStats } from '../../utils/api';
import Navbar from '../../components/Navbar';
import { Currency, Document, User } from '@carbon/icons-react';

const UsersPage = () => {
    const [stats, setStats] = useState<GeneralStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchGeneralStats();
                console.log(data);
                
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
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">User Stats</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                {/* Summary Cards Row */}
                <div className="xui-d-grid xui-grid-col-2 xui-md-grid-col-2 xui-lg-grid-col-4 xui-grid-gap-1 xui-md-grid-gap-1 xui-mt-1 xui-mb-2">
                    <div className="xui-bg-[#193086] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <User size={14} />
                            <span className="xui-font-sz-[12px]">Total Users</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_users.toLocaleString()}</h3>
                    </div>
                    <div className="xui-bg-[#e65100] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Currency size={14} />
                            <span className="xui-font-sz-[12px]">Active Subscriptions</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_users_via_active_subscription.find(item => item.active_subscription)?.total_count.toLocaleString() || 0}</h3>
                    </div>
                    <div className="xui-bg-[#193086] xui-text-white xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <User size={14} />
                            <span className="xui-font-sz-[12px]">Sellers</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_users_via_seller.find(item => item.seller)?.total_count.toLocaleString() || 0}</h3>
                    </div>
                    <div className="xui-bg-black-switch xui-text-white-switch xui-bdr-rad-[8px] xui-p-1">
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-grid-gap-[8px] xui-opacity-6">
                            <Document size={14} />
                            <span className="xui-font-sz-[12px]">Agreed To Terms</span>
                        </div>
                        <h3 className="xui-font-sz-[28px] xui-mt-1 xui-mb-none">{stats.data.total_users_via_agreement.find(item => item.agreement)?.total_count.toLocaleString() || 0}</h3>
                    </div>
                </div>

                <div className="xui-row">
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Users by Business Type</h4>
                            <div className="xui-overflow-auto" style={{ maxHeight: '400px' }}>
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Business Type</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_business_type.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.BusinessType?.name || 'Unknown'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Users by Plan</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Plan</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_plan.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Plan.name}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                    <h4 className="xui-mb-1">User Demographics</h4>
                    <div className="xui-row">
                        <div className="xui-col-12 xui-md-col-6">
                            <h5>By Country</h5>
                            <div className="xui-overflow-auto" style={{ maxHeight: '300px' }}>
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Country</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_country.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.country || 'Unknown'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="xui-col-12 xui-md-col-6">
                            <h5>By Currency</h5>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_currency.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.currency}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-row">
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Users by Country Code</h4>
                            <div className="xui-overflow-auto" style={{ maxHeight: '400px' }}>
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Country Code</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_by_country.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.countryCode}</td>
                                                <td>{item.count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Users by Access</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Access</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_access.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.access === 1 ? 'Has Access' : 'No Access'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-row">
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Subscription Status</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_active_subscription.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.active_subscription ? 'Active' : 'Inactive'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Terms of Service Agreement</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Agreed</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_agreement.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.agreement ? 'Yes' : 'No'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-row">
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Buyer Status</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Is Buyer</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_buyer.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.buyer ? 'Yes' : 'No'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Seller Status</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Is Seller</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_seller.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.seller ? 'Yes' : 'No'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-lg-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                            <h4 className="xui-mb-1">Ban Status</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Banned</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_users_via_banned.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.banned ? 'Yes' : 'No'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                    <h4 className="xui-mb-1">Users by Country and State</h4>
                    <div className="xui-overflow-auto" style={{ maxHeight: '500px' }}>
                        <table className="xui-w-fluid-100 xui-table">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.data.total_users_via_country_and_state.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.country || 'Unknown'}</td>
                                        <td>{item.state || 'Unknown'}</td>
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

export default UsersPage;