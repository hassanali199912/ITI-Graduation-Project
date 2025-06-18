import type React from "react";
import ButtonShowcase from "./ShowBTNS";
import BreadcrumbCard from "./breadcrumbsData";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";


const UIIndex: React.FC = () => {

    return (<>

        <div className="w-[90%] mx-auto my-3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Button Showcase</h2>
            <div className="flex flex-wrap gap-3">
                <ButtonShowcase />
            </div>
        </div>
        <div className="w-[90%] mx-auto my-3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">BreadcrumbCard Showcase</h2>
            <div className="flex flex-wrap gap-3">
                <BreadcrumbCard />
            </div>
        </div>
        {/* <div className="w-[90%] mx-auto my-3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Language Switcher</h2>
            <div className="flex flex-wrap gap-3">
                <LanguageSwitcher />
            </div>
        </div> */}

    </>)
}


export default UIIndex