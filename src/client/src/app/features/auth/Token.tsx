import { useEffect } from "react";

import { homepage, router } from "../../router/Routes";
import agent from "../../api/agent";
import TokenService from "../../services/tokenService";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";

export interface ITokenProps {
  authCode: string;
}

const Token = (props: ITokenProps) => {
  const { data } = useFetchDataAndValidateRef({ initialState: null, callback: () => agent.Auth.token(props.authCode) });

  useEffect(() => {
    if (!data) return;
    TokenService.setToken(JSON.stringify(data));
    router.navigate(homepage);
  }, [data, useFetchDataAndValidateRef]);

  return <></>;
};

export default Token;
