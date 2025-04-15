export const getBasePath = () => {
    if (typeof window !== 'undefined') {
      // Dacă rulează în browser
      return process.env.NEXT_PUBLIC_BASE_PATH || '';
    }
  
    return ''; // fallback
  };
  