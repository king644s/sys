import type { Metadata } from 'next';
import { Professionals } from '@/views/Professionals';

export const metadata: Metadata = {
  title: 'For Professionals — SYSlight',
  description:
    'Spec sheets, IES files, custom options and project pricing for architects, consultants, contractors and dealers.',
};

export default function Page() {
  return <Professionals />;
}
