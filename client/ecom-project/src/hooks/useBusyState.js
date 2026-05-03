import { useRef, useState } from "react";

const useBusyState = (loadingState) => {
  const [isBusy, setIsBusy] = useState(false);
  const trackState = useRef([]);

  if (trackState.current.length === 0 && isBusy && loadingState)
    trackState.current.push(1);

  if (trackState.current.length === 1 && isBusy && !loadingState) {
    setIsBusy(false);
    trackState.current = [];
  }

  return { isBusy, setIsBusy };
};

export { useBusyState };
