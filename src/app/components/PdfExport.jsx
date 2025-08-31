"use client";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

export default function PdfExport({ dashboardRef }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const buttonRef = useRef(null);

  const exportToPdf = async () => {
    if (isGenerating) return;
    if (!dashboardRef.current) return;
    
    try {
      setIsGenerating(true);
      
      // Create a new PDF with A4 dimensions (in mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add title and metadata
      const title = 'Financial Dashboard Report';
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Set up styles
      const titleFontSize = 20;
      const subtitleFontSize = 12;
      const textColor = 100;
      const primaryColor = '#3B82F6';
      const margin = 20;
      const lineHeight = 7;
      
      // Add title and date
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(titleFontSize);
      pdf.setTextColor(40);
      pdf.text(title, margin, margin);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(subtitleFontSize);
      pdf.setTextColor(textColor);
      pdf.text(`Generated on: ${date}`, margin, margin + 10);
      
      // Add a line separator
      pdf.setDrawColor(200);
      pdf.line(margin, margin + 15, 210 - margin, margin + 15);
      
      // Hide elements that shouldn't be in the PDF
      const elementsToHide = [];
      const originalStyles = [];
      
      // Hide interactive elements and show loading states
      const hideElements = document.querySelectorAll('button, a, .skeleton, .theme-toggle');
      hideElements.forEach(el => {
        const originalDisplay = window.getComputedStyle(el).display;
        originalStyles.push({ element: el, style: el.style.display });
        el.style.display = 'none';
      });
      
      // Show loading states for charts if needed
      const charts = document.querySelectorAll('.chart-container');
      charts.forEach(chart => {
        if (chart.querySelector('canvas')) {
          chart.dataset.originalDisplay = chart.style.display;
          chart.style.display = 'block';
        }
      });
      
      // Add a small delay to ensure all elements are properly rendered
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Convert the dashboard content to an image
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      });
      
      // Restore original styles
      originalStyles.forEach(({ element, style }) => {
        element.style.display = style;
      });
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170; // A4 width - margins (210 - 20 - 20)
      const pageHeight = 277; // A4 height in mm - margins (297 - 10 - 10)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the first page
      let yPos = margin + 20; // Start position after title and separator
      
      // Check if the content will fit on one page
      if (imgHeight > (pageHeight - yPos)) {
        // Content is too long, split into multiple pages
        let heightLeft = imgHeight;
        let pageNumber = 1;
        
        while (heightLeft > 0) {
          if (pageNumber > 1) {
            pdf.addPage();
            yPos = 10; // Reset Y position for new pages
          }
          
          const sectionHeight = Math.min(heightLeft, pageHeight - yPos - 10); // 10mm margin at bottom
          
          pdf.addImage(
            imgData,
            'PNG',
            margin,
            yPos,
            imgWidth,
            imgHeight,
            undefined,
            'FAST' // Faster rendering
          );
          
          // Add page number
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text(
            `Page ${pageNumber}`,
            210 - margin - 20,
            287,
            { align: 'right' }
          );
          
          heightLeft -= sectionHeight;
          yPos = 10; // Reset for next page
          pageNumber++;
        }
      } else {
        // Content fits on one page
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          yPos,
          imgWidth,
          imgHeight,
          undefined,
          'FAST' // Faster rendering
        );
        
        // Add page number
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.text(
          'Page 1',
          210 - margin - 20,
          287,
          { align: 'right' }
        );
      }
      
      // Save the PDF with the formatted filename
      pdf.save(`financial_report_${getFormattedDate()}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Format the current date as YYYY-MM-DD
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        ref={buttonRef}
        onClick={exportToPdf}
        disabled={isGenerating}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
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
            Export to PDF
          </>
        )}
      </button>
    </div>
  );
}
