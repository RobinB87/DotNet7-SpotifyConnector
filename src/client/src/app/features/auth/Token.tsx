import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";
import TokenService from "../../api/tokenService";

export interface ITokenProps {
  authCode: string;
}

const Token = (props: ITokenProps) => {
  const dataFetchedRef = useRef(false);

  const fetchData = async () => {
    const token = await agent.Auth.token(props.authCode);
    TokenService.setToken(token.token);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return <></>;
};

export default Token;
