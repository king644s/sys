export const WHATSAPP_NUMBER = '919820004966';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(product: {
  name: string;
  id: string;
  vendorCode?: string;
  shortSpec?: string;
  category: string;
}): string {
  const lines = [
    'Hello SYSlight,',
    '',
    'I would like to inquire about the following luminaire:',
    '',
    `Product: ${product.name}`,
    `Catalog ID: SYS-${product.id.toUpperCase()}`,
  ];

  if (product.vendorCode) {
    lines.push(`Vendor Code: ${product.vendorCode}`);
  }

  if (product.shortSpec) {
    lines.push(`Specification: ${product.shortSpec}`);
  }

  lines.push(
    '',
    'Please share pricing, availability, lead times, and any additional technical details.',
    '',
    'Thank you.'
  );

  return lines.join('\n');
}
