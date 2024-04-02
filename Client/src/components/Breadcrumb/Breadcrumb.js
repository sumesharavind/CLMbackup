import React from "react";
import BreadcrumbCSS from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";

const Breadcrumb = ({ currentPath }) => {
  const paths = currentPath.split("/");

  return (
    <div className={BreadcrumbCSS.Breadbg}>
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && " > "}
          {index === paths.length - 1 ? (
            <span className="ms-2">{path}</span>
          ) : (
            <Link className={BreadcrumbCSS.breadcrumbs}>{path}</Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
