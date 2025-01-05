const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const TOKEN = import.meta.env.VITE_BREED_API;
export const getApi = async <T, P extends Record<string, unknown> = Record<string, unknown>>(
  apiName: string,
  params?: P
): Promise<T> => {
  const queryString = (params && Object.keys(params).length)
    ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
    : "";

  const response = await fetch(`${VITE_BASE_URL}${apiName}${queryString}`, {
    headers: {
      "x-api-key": TOKEN,
    },
  });

  const data: T = await response.json();
  return data;
};

export const postApi = async <T, P>(apiName: string, body: P): Promise<T> => {
  const response = await fetch(`${VITE_BASE_URL}${apiName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": TOKEN,
    },
    body: JSON.stringify(body),
  });

  const data: T = await response.json();
  return data;
};
