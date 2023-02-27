import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";

export interface ITokenProps {
  authCode: string;
}

const Token = (props: ITokenProps) => {
  const dataFetchedRef = useRef(false);
  const [uri, setUri] = useState("");

  const fetchData = async () => {
    setUri(await agent.Auth.token(props.authCode));
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return <></>;
};

export default Token;
