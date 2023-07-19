import useSWR from 'swr';
import { AxiosRequestConfig } from 'axios';
import api from '../services/api';

interface Response {
  data: any;
  error: any;
  mutate: any;
}

export function useFetch<Data = any, Error = any>(
  url: string,
  params: AxiosRequestConfig = {},
  refresh = 120000,
  noCache = false,
): Response {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async urlparam => {
      if (noCache === false) {
        const response = await api.get(urlparam, params);

        return response.data;
      }
      const response = await api.get(urlparam, params);
      localStorage.removeItem(`@AGF-BI:${urlparam}`);
      return response.data;
    },
    {
      refreshInterval: refresh,
      revalidateOnFocus: false,
    },
  );

  return { data, error, mutate };
}
