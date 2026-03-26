import { RefObject, useEffect, useState } from "react";

export const useMountedWithWidth = (ref: RefObject<HTMLElement | null>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isDisposed = false;

    const checkSize = () => {
      if (isDisposed) return;

      if (ref.current && ref.current.offsetWidth > 0) {
        setMounted(true);
      } else {
        timeoutId = setTimeout(checkSize, 100);
      }
    };

    checkSize();

    return () => {
      isDisposed = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ref]);

  return mounted;
};
