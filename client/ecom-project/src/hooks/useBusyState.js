import { useRef, useState } from "react";

const useBusyState = (loadingState) => {
  const [isBusy, setIsBusy] = useState(false);
  const trackState = useRef(false);

  if (trackState.current === false && isBusy && loadingState)
    trackState.current = true;

  if (trackState.current === true && isBusy && !loadingState) {
    setIsBusy(false);
    trackState.current = false;
  }

  return { isBusy, setIsBusy };
};

export { useBusyState };
