import React from 'react';

interface GeneratedImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
        <p className="text-indigo-300">Generating your masterpiece...</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-lg">Your generated image will appear here.</p>
        <p className="text-sm">Upload images and a prompt to begin.</p>
    </div>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ image, isLoading, error }) => {
  return (
    <div className="w-full h-full min-h-[400px] aspect-square bg-gray-900/70 border border-gray-700 rounded-lg flex items-center justify-center p-4">
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
          <div className="text-center text-red-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-4 font-semibold">Generation Failed</p>
            <p className="mt-2 text-sm max-w-sm">{error}</p>
          </div>
      )}
      {!isLoading && !error && image && (
        <div className="relative group w-full h-full flex items-center justify-center">
          <img src={image} alt="Generated" className="max-w-full max-h-full object-contain rounded-md" />
          <a
            href={image}
            download="ai-style-fusion.png"
            className="absolute top-4 right-4 z-10 p-3 bg-gray-800/70 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Download generated image"
            title="Download Image"
          >
            <DownloadIcon />
          </a>
        </div>
      )}
      {!isLoading && !error && !image && <Placeholder />}
    </div>
  );
};