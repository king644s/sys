import { Product } from '@/types';
import { getProductCodeDisplay } from '@/utils/productCodes';

export const WHATSAPP_NUMBER = '919820281588';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(product: Product): string {
  const catalogId = getProductCodeDisplay(product);

  const lines = [
    'Hello SYSlight,',
    '',
    'I would like to inquire about the following Light / LED light:',
    '',
    `Product: ${product.name}`,
  ];

  if (catalogId) {
    lines.push(`Product Code: ${catalogId}`);
  }

  if (product.vendorCode) {
    lines.push(`Vendor Code: ${product.vendorCode}`);
  }

  lines.push('', 'Thank you.');

  return lines.join('\n');
}
