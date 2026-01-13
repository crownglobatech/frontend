
export const generateBookingTermsPDF = async (booking: any) => {
  if (!booking) return;

  const jsPDF = (await import("jspdf")).default;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Booking Reference Terms", margin, 20);

  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Booking ID: ${booking.booking_code || booking.id}`, margin, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, 35);
  const customerName = typeof booking.customer === 'string' ? booking.customer : `${booking.customer?.first_name || ''} ${booking.customer?.last_name || ''}`.trim() || 'N/A';
  const providerName = typeof booking.vendor === 'string' ? booking.vendor : typeof booking.provider === 'string' ? booking.provider : `${booking.provider?.first_name || ''} ${booking.provider?.last_name || ''}`.trim() || 'N/A';

  doc.text(`Customer: ${customerName}`, margin, 40);
  doc.text(`Provider: ${providerName}`, margin, 45);

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 50, pageWidth - margin, 50);

  // Content
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const terms = booking.reference_terms || "No reference terms provided.";
  const splitText = doc.splitTextToSize(terms, contentWidth);
  
  doc.text(splitText, margin, 60);

  // Footer
  const pageCount = doc.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
     doc.setPage(i);
     doc.setFontSize(8);
     doc.setTextColor(150, 150, 150);
     doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: "right" });
  }

  doc.save(`booking_terms_${booking.booking_code || booking.id}.pdf`);
};

