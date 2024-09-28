import { useEffect } from 'react';

const AdSenseScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025";
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything, just adds the script
};

export default AdSenseScript;
