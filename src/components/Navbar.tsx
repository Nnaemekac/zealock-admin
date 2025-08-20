import { Menu } from "@carbon/icons-react";
import type { ReactNode } from "react";

interface NavbarProps {
    heading?: ReactNode
}

const Navbar = ({ heading } : NavbarProps) => {
    return (
        <>
        <nav className="xui-px-1 xui-lg-px-2 xui-d-flex xui-flex-ai-center xui-flex-jc-space-between">
            {heading}
            <div className="xui-d-inline-flex xui-grid-gap-1 xui-flex-ai-center">
                <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light xui-bg-position-center-center xui-bg-size-cover xui-bg-img-[url('https://images.pexels.com/photos/17407385/pexels-photo-17407385/free-photo-of-cute-pomeranian-puppy.jpeg?auto=compress&cs=tinysrgb&w=600')] xui-effect-ripple xui-cursor-pointer"></div>
                <div className="xui-w-40 xui-h-40 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-bg-light xui-bdr-rad-circle xui-bg-light xui-bdr-w-1 xui-bdr-style-solid xui-bdr-fade xui-opacity-6 xui-cursor-pointer menu">
                    <Menu size={20} />
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar;