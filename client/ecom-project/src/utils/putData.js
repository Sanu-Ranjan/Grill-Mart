import { authHeaders, handleUnauthorized } from "./auth";

export const putData = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(body),
    });

    handleUnauthorized(res);
    const data = await res.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
