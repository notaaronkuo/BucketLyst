import React, { useEffect, useState } from 'react';
import '../pages/css/MainPages.css'

function Overlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  console.log("Overlay")

  return visible ? <div className="overlay"></div> : null;
}

export default Overlay;