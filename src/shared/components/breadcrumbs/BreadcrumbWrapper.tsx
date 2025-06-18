import { lazy, Suspense } from "react";
import { type BreadcrumbItemType } from "./Breadcrumbs";
const Breadcrumbs = lazy(() => import("../breadcrumbs/Breadcrumbs"));
import BreadcrumbsLoader from "../loader/BreadcrumbsLoader";
import { HiMiniChevronRight } from "react-icons/hi2";

interface BreadcrumbsWrapperProps {
  items: BreadcrumbItemType[];
}

export const BreadcrumbsWrapper = ({ items }: BreadcrumbsWrapperProps) => (
  <Suspense fallback={<BreadcrumbsLoader />}>
    <Breadcrumbs
      separator={<HiMiniChevronRight size={18} className="text-gray-400" />}
      breadcrumbs={items}
    />
  </Suspense>
);
