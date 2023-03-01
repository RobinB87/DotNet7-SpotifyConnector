import { useEffect, useRef, useState } from "react";

export interface FetchDataAndValidateRefProps<T> {
  initialState: T | null;
  callback: () => Promise<T | null>;
}

/* Hook to ensure api is called only once, because of StrictMode */
const useFetchDataAndValidateRef = <T>(props: FetchDataAndValidateRefProps<T>) => {
  const [data, setData] = useState<T | null>(props.initialState);
  const dataFetchedRef = useRef(false);

  const fetchData = async () => {
    setData(await props.callback());
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });

  return { data };
};

export default useFetchDataAndValidateRef;
