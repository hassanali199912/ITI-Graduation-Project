import React from 'react'
type Props={
    backFun:Function,
    nextFun:Function
}
export default function FormsHandle({backFun,nextFun}:Props) {
  return (
    <>
         <div className="flex items-center justify-between mb-4">
              <button onClick={()=>{backFun()}} className="text-blue-700 flex items-center py-1 px-4 gap-2 cursor-pointer">
                <span>
                  <img src="/arrow-right.png" alt="" />
                </span>
                رجوع
              </button>
              <button onClick={()=>{nextFun()}} className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center gap-4 cursor-pointer">
                استمرار
                <span>
                  <img src="/arrow-left.png" alt="" />
                </span>
              </button>
              
            </div>
            <div className="text-base text-gray-500 text-center cursor-pointer">
               لديك حساب ؟    سجل دخول
            </div>
    </>
  )
}
