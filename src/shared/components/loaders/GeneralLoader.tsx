
import React from "react";
import style from "./style.module.css";
const GeneralLoader = () => {

    return <>
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50">
            <div className={style.loader}></div>
            <p className="mt-4 text-white text-sm font-medium">Loading, please wait...</p>
        </div>
    </>
}


export default React.memo(GeneralLoader)