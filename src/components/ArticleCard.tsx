import { Link } from "react-router";

interface ArticleCardProps {
    banner: string;
    name: string;
    period: string;
    path?: string;
}

const ArticleCard = ({ banner, name, period, path } : ArticleCardProps) => {
    return (
        <>
        <Link to={path ? path : ''} className="xui-bdr-w-1 xui-bdr-style-solid xui-bdr-fade xui-bdr-rad-[8px] xui-p-[8px] xui-text-inherit xui-text-dc-none">
            <div className={`xui-h-[200px] xui-bg-light xui-bdr-rad-[4px] xui-bg-sz-cover xui-bg-pos-center xui-bg-img-[url(${banner})]`}></div>
            <div className="xui-mt-1">
                <h3 className="xui-font-sz-[16px]">{name}</h3>
                <span className="xui-font-sz-[13px] xui-opacity-4 xui-d-inline-block xui-mt-[4px]">{period}</span>
            </div>
        </Link>
        </>
    );
};

export default ArticleCard;