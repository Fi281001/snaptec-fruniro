import { useState, useEffect } from "react";

function useDeviceType() {
  const [deviceType, setDeviceType] = useState(
    window.innerWidth <= 768 ? "mobile" : "desktop"
  );

  useEffect(() => {
    function handleResize() {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

export default useDeviceType;
