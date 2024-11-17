import axios from 'axios';
import { useEffect, useState } from 'react';

export interface ResponseData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const getResponse = async () => {
    setLoading(true);
    const response = await axios.get(url);

    setResponseData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const id = setInterval(getResponse, 10000);

    return () => clearInterval(id);
  }, [url]);

  return { responseData, loading };
};
