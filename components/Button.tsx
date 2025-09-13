
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.455L12.75 18l1.197-.398a3.375 3.375 0 002.455-2.455L16.5 14.25l.398 1.197a3.375 3.375 0 002.455 2.455L20.25 18l-1.197.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
);


export const Button: React.FC<ButtonProps> = ({ children, disabled, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold text-white rounded-lg shadow-lg
        bg-gradient-to-r from-purple-600 to-indigo-600
        hover:from-purple-700 hover:to-indigo-700
        focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
        transition-all duration-300 ease-in-out transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
      `}
    >
        <SparklesIcon />
        <span>{children}</span>
    </button>
  );
};
