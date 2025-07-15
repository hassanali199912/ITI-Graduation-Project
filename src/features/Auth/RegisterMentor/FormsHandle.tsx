import React from 'react';

type Props = {
  backFun: () => void;
  nextFun: () => void;
  isLastStep: boolean;
};

export default function FormsHandle({ backFun, nextFun, isLastStep }: Props) {
  return (
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={backFun}
        disabled={backFun === null}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        رجوع
      </button>
      <button
        type="button"
        onClick={nextFun}
        className="flex gap-2 items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
        {isLastStep ? 'إرسال' : 'استمرار'}
          <span>
            <img src="/public/arrow-left.png" alt="" />
          </span>
      </button>
    </div>
  );
}