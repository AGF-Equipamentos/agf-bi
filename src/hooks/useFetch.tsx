import useSWR from 'swr';
import api from '../services/api';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useFetch<Data = any, Error = any>(
  url: string,
  params: object = {},
  refresh = 120000,
  noCache = false,
): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      if (noCache === false) {
        const localData = localStorage.getItem(`@AGF-BI:${urlparam}`);
        if (localData === null) {
          const response = await api.get(urlparam, params);
          localStorage.setItem(
            `@AGF-BI:${urlparam}`,
            JSON.stringify(response.data),
          );

          return response.data;
        }
        return JSON.parse(localData);
      }
      const response = await api.get(urlparam, params);
      localStorage.removeItem(`@AGF-BI:${urlparam}`);
      return response.data;
    },
    {
      refreshInterval: refresh,
    },
  );

  return { data, error, mutate };
}
