
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  title: string;
  onImageSelect: (file: File, previewUrl: string) => void;
  imagePreviewUrl: string | null;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onImageSelect, imagePreviewUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        onImageSelect(file, previewUrl);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        processFile(file);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };


  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-indigo-300 mb-3">{title}</h3>
      <div
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full aspect-square bg-gray-900/70 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-all duration-200 overflow-hidden group ${isDragging ? 'border-indigo-500 ring-4 ring-indigo-500/50' : 'border-gray-700'}`}
        aria-label={`Upload ${title}`}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imagePreviewUrl ? (
          <>
            <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-semibold">Change Image</p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 pointer-events-none">
            <UploadIcon />
            <p className="mt-2 text-sm">Click or drag &amp; drop</p>
          </div>
        )}
      </div>
    </div>
  );
};
