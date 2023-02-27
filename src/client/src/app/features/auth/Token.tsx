import { useEffect, useRef } from "react";
import { homepage, router } from "../../router/Routes";

import agent from "../../api/agent";
import TokenService from "../../services/tokenService";

export interface ITokenProps {
  authCode: string;
}

const Token = (props: ITokenProps) => {
  const dataFetchedRef = useRef(false);

  const fetchData = async () => {
    const token = await agent.Auth.token(props.authCode);
    TokenService.setToken(JSON.stringify(token));
    router.navigate(homepage);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return <></>;
};

export default Token;
