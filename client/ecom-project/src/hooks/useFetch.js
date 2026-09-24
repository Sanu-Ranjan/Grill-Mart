import { useState, useEffect } from "react";
import { authHeaders, handleUnauthorized } from "../utils/auth";

// pass url as null to skip the request (e.g. protected data while logged out)
export const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { headers: authHeaders() });
        handleUnauthorized(res);
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    })();
  }, [url, refresh]);
  return { data, error, loading };
};
