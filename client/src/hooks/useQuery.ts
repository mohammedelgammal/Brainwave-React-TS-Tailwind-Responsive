import { useState, useEffect } from "react";

// Libraries
import axios, { AxiosError, AxiosResponse } from "axios";

// Types
import { QueryResponse, Props } from "types/useQueryTypes";

const useQuery = ({
  url,
  method,
  payload,
  executeImmediately = false,
}: Props): QueryResponse => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<AxiosError>();
  const [data, setData] = useState<AxiosResponse>();

  const executeNow = () => executeQuery({ url, method, payload });

  const executeQuery = ({ url, method, payload }: Props): void => {
    setIsLoading(true);
    axios({
      method,
      url,
      data: payload,
    })
      .then(
        (response: AxiosResponse): void => {
          setData(response.data);
          setIsLoading(false);
        },
        (error: AxiosError): void => {
          setError(error);
          setIsLoading(false);
        }
      )
      .finally((): void => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    executeImmediately &&
      executeQuery({ url, method, payload, executeImmediately });
  }, []);

  return { isLoading, error, data, executeNow };
};

export default useQuery;