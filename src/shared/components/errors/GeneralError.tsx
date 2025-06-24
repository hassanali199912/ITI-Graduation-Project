import React from "react";

interface ErrorFallbackProps {
    error?: Error;
    resetErrorBoundary?: () => void;
}

const GeneralLErrorUI: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
            <div className="flex items-center gap-3 bg-red-100 text-red-600 px-5 py-3 rounded-lg shadow-md">
                <h2 className="text-xl semibold">Oops! Something went wrong</h2>
            </div>

            <p className="mt-4 text-gray-600 text-center max-w-md">
                An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
            </p>

            {error?.message && (
                <details className="mt-3 bg-white p-3 rounded-lg border border-gray-300 shadow-sm max-w-md text-sm text-gray-600">
                    <summary className="cursor-pointer text-gray-700 medium">Error Details</summary>
                    <pre className="mt-2 text-red-500 whitespace-pre-wrap">{error.message}</pre>
                </details>
            )}

            <button
                onClick={resetErrorBoundary}
            >
                Refresh Page
            </button>
        </div>
    );
};
export default GeneralLErrorUI;