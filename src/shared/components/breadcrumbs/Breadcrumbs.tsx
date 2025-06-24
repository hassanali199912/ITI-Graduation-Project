import React, { type ReactElement } from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbSeparator from "./BreadcrumbSeparator";
import { BreadcrumbsProvider } from "./BreadcrumbsContext";

export type BreadcrumbItemType = {
  label: string;
  href: string;
  breadcrumbs?: BreadcrumbItemType[];
};

interface BreadcrumbsProps {
  separator: string | ReactElement;
  breadcrumbs: BreadcrumbItemType[];
  additionalClassNames?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = ">",
  breadcrumbs = [],
  additionalClassNames = "pt-lg pb-lg",
}) => {
  const breadcrumbClass =
    "flex justify-start items-center py-md container"
    + additionalClassNames


  return (
    <BreadcrumbsProvider separator={separator}>
      <div className={breadcrumbClass}>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem
              href={item.href}
              isLast={index === breadcrumbs.length - 1}
            >
              {item.label}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </div>
    </BreadcrumbsProvider>
  );
};

export default Breadcrumbs;
