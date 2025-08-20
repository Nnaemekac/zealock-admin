import { useEffect, useState } from 'react';
import type { GeneralStats } from '../../types/apiTypes';
import { fetchGeneralStats } from '../../utils/api';
import Navbar from '../../components/Navbar';

const ItemsPage = () => {
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

    return (
        <>
            <Navbar heading={<h1 className="xui-font-sz-[20px] xui-lg-font-sz-[20px]">Item Management</h1>} />
            <div className="content xui-px-1 xui-lg-px-2">
                <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1 xui-mb-1">
                    <h4 className="xui-mb-1">Items by Category</h4>
                    <div className="xui-overflow-auto" style={{ maxHeight: '400px' }}>
                        <table className="xui-w-fluid-100 xui-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.data.total_items_via_category.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Category.name}</td>
                                        <td>{item.total_count.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="xui-row xui-mt-1">
                    <div className="xui-col-12 xui-md-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Items by Currency</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_items_via_currency.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.currency || 'Unknown'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="xui-col-12 xui-md-col-6">
                        <div className="xui-bdr-rad-[8px] xui-bdr-fade xui-bdr-w-1 xui-bdr-style-solid xui-p-1">
                            <h4 className="xui-mb-1">Items by File Type</h4>
                            <div className="xui-overflow-auto">
                                <table className="xui-w-fluid-100 xui-table">
                                    <thead>
                                        <tr>
                                            <th>File Type</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.data.total_items_via_file_type.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.file_type || 'Unknown'}</td>
                                                <td>{item.total_count.toLocaleString()}</td>
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

export default ItemsPage;