import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ product }) {

    const { category, name } = product;

    const generateBreadcrumbItems = () => {
        const items = [
            { label: "Home", link: "/" },
            { label: "Category", link: `/category/${category}` },
            { label: name },
        ];

        return items.map((item, index) => (
            <li key={index} className={`breadcrumb-item${index === items.length - 1 ? ' active' : ''}`} aria-current={index === items.length - 1 ? 'page' : null}>
                {index === items.length - 1 ? (
                    item.label
                ) : (
                    <Link to={item.link}>{item.label}</Link>
                )}
            </li>
        ));
    };

    return (
        <div className="py-4">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {generateBreadcrumbItems()}
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default BreadCrumb;
