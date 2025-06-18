import React from "react";
import Breadcrumbs, { type BreadcrumbItemType } from "../breadcrumbs/Breadcrumbs";

const breadcrumbsData: BreadcrumbItemType[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mentors", href: "/dashboard/mentors" },
  { label: "John Doe", href: "/dashboard/mentors/john-doe" },
];

const BreadcrumbCard = () => {
  return (
    <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Breadcrumb Navigation</h2>

      <Breadcrumbs
        separator=">"
        breadcrumbs={breadcrumbsData}
        additionalClassNames=" py-4"
      />

      <div className="mt-6 text-sm text-gray-500">
        This breadcrumb helps the user understand their position in the page hierarchy.
      </div>
    </div>
  );
};

export default BreadcrumbCard;
