import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

/* Hook to ensure api is called only once, because of StrictMode */
const useFetchDataAndValidateRef = (callback: CallbackFunction) => {
  const dataFetchedRef = useRef(false);

  const fetchData = async () => {
    callback();
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  });
};

export default useFetchDataAndValidateRef;
