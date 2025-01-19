import { useState } from 'react';

interface FetchOptions {
  method: 'GET' | 'POST';
  body?: any;
  headers?: HeadersInit;
}

export const useHttpService = (baseUrl: string = 'http://localhost:5109/Multilanguage') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchData = async (
    controller: string,
    query: string = '',
    options: FetchOptions = { method: 'GET' }
  ) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${baseUrl}/${controller}${query ? `?${query}` : ''}`;

      const fetchOptions: RequestInit = {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...(options.body && { body: JSON.stringify(options.body) }),
      };

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}