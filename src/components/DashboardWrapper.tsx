import { Dashboard, User, ChartLine, ShoppingCart, Logout, Report, List } from "@carbon/icons-react";
import { modalShow } from "@richaadgigi/stylexui";
import { Link, NavLink, Outlet } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal";

const DashboardWrapper = () => {
    const handleLogout = () => {
        modalShow("logout-modal");
    };
    return (
        <section className="xui-dashboard">
            <div className="navigator">
                <div className="brand">
                    <h1>Zealock Admin</h1>
                </div>
                <div className="links">
                    <p className="xui-text-tr-uppercase xui-font-sz-[12px] xui-opacity-6 xui-ml-[12px] xui-mt-1">Main Menu</p>
                    <NavLink to="/dashboard" end className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <Dashboard size={18} />
                        </div>
                        <span className="text">Overview</span>
                    </NavLink>
                    <NavLink to="/dashboard/users" className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <User size={18} />
                        </div>
                        <span className="text">Users</span>
                    </NavLink>
                    <NavLink to="/dashboard/items" className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <ShoppingCart size={18} />
                        </div>
                        <span className="text">Items</span>
                    </NavLink>
                    <NavLink to="/dashboard/analytics" className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <ChartLine size={18} />
                        </div>
                        <span className="text">Analytics</span>
                    </NavLink>
                    <p className="xui-text-tr-uppercase xui-font-sz-[12px] xui-opacity-6 xui-ml-[12px] xui-mt-4">Other Links</p>
                    <NavLink to="/dashboard/reports" className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <Report size={18} />
                        </div>
                        <span className="text">Reports</span>
                    </NavLink>
                    <NavLink to="/dashboard/logs" className={({ isActive }) => {
                        return `link-box ${isActive ? "active" : ""}`
                    }}>
                        <div className="icon">
                            <List size={18} />
                        </div>
                        <span className="text">Activity Logs</span>
                    </NavLink>
                    <div className="bottom-fixed">
                        <Link to="/dashboard/settings" className="xui-d-flex xui-flex-ai-center xui-grid-gap-half link-box xui-py-1">
                            <div className="xui-w-[44px] xui-h-[44px] xui-bdr-rad-circle xui-bg-light xui-bg-size-cover xui-bg-position-center-center"></div>
                            <div className="">
                                <h4 className="xui-font-sz-[14px]">Admin</h4>
                                <span className="xui-d-inline-block xui-opacity-6 xui-font-sz-[12px]">Super Admin</span>
                            </div>
                        </Link>
                        <div className={"link-box"} onClick={handleLogout}>
                            <div className="icon">
                                <Logout size={18} />
                            </div>
                            <span className="text">Log out</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="screen" xui-navbar="true">
                <Outlet />
            </div>
            <LogoutModal />
        </section>
    );
};

export default DashboardWrapper;