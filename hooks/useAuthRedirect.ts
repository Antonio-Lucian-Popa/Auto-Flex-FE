'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      router.push(`auth/login`);
    };

    window.addEventListener('redirect-to-login', handler);

    return () => {
      window.removeEventListener('redirect-to-login', handler);
    };
  }, [router]);
};
