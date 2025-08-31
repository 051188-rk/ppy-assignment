"use client";

import { useState } from 'react';

export default function PdfExportButton({ 
  onExport, 
  label = 'Export to PDF',
  size = 'md',
  variant = 'outline',
  className = ''
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async () => {
    if (isGenerating) return;
    
    try {
      setIsGenerating(true);
      await onExport();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const variantClasses = {
    outline: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700',
    solid: 'bg-blue-600 hover:bg-blue-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isGenerating}
      className={`
        inline-flex items-center gap-1.5 rounded-md transition-colors
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      title={label}
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3.5 w-3.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
