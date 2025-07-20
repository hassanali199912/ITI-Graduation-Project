import React from "react";

const ChatSidebarSkeleton: React.FC = () => (
  <aside className="w-full sm:w-80 bg-base-100 border-r border-base-300 flex flex-col animate-pulse">
    {/* Search Bar Skeleton */}
    <div className="p-4">
      <div className="h-10 bg-gray-200 rounded-lg"></div>
    </div>
    {/* Chat List Skeleton */}
    <ul className="flex-1 overflow-y-auto">
      {[...Array(8)].map((_, index) => (
        <li key={index} className="flex items-center gap-3 px-4 py-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </li>
      ))}
    </ul>
  </aside>
);

const ChatMainSkeleton: React.FC = () => (
  <main className="flex-1 flex flex-col">
    {/* Header Skeleton */}
    <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-100">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    {/* Messages Skeleton */}
    <div className="flex-1 p-4 space-y-4 bg-gradient-to-tl from-blue-800/15 to-white">
      {[...Array(6)].map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-xs ${index % 2 === 0 ? 'flex items-start gap-2' : 'flex items-end gap-2'}`}>
            {index % 2 === 0 && <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>}
            <div className="bg-gray-200 rounded-lg p-3">
              <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
            {index % 2 === 1 && <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>}
          </div>
        </div>
      ))}
    </div>
    {/* Input Skeleton */}
    <div className="p-4 bg-base-100 border-t border-base-300 flex gap-2">
      <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
      <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
    </div>
  </main>
);

const ChatWelcomeSkeleton: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-tl from-blue-800/15 to-white animate-pulse">
    <div className="text-center space-y-6 p-8">
      {/* Icon Skeleton */}
      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full"></div>
      
      {/* Title Skeleton */}
      <div>
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-80"></div>
      </div>
      
      {/* Features Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export { ChatSidebarSkeleton, ChatMainSkeleton, ChatWelcomeSkeleton }; 