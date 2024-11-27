import { useEffect, useCallback } from 'react';
import 'odometer/themes/odometer-theme-slot-machine.css';

declare global {
  interface Window {
    Odometer: any;
  }
}

export const useOdometer = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/wqzwh/odometer/odometer.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const startAnimation = useCallback(() => {
    return new Promise<number>((resolve) => {
      if (ref.current && window.Odometer) {
        const od = new window.Odometer({
          el: ref.current,
          value: '000',
          theme: 'slot-machine',
          format: '(ddd)',
          numberLength: 3, // Force 3-digit display
          zeroFlag: true,  // Distinguish between padding zeros and actual zeros
          duration: 2000

        });

        // Generate random number between 1 and 300
        const randomNumber = Math.floor(Math.random() * 300) + 1;
        
        
        // Update odometer value
        od.update(randomNumber);
        
        // Resolve with the random number after animation
        setTimeout(() => {
          resolve(randomNumber);
        }, 2000);
      }
    });
  }, [ref]);

  return { startAnimation };
};