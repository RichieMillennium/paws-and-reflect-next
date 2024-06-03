export const apiGet = async <T>(url: string): Promise<T | Error> => {
  const res = await fetch(new Request(url, {
    method: 'GET'
  }));
  if (res.ok) {
    const data = await res.json();
    return data as T;
  }
  throw new Error(`GET failed for request to ${url}`);
};
