import { homepage, router } from "../../router/Routes";
import agent from "../../api/agent";
import TokenService from "../../services/tokenService";
import useFetchDataAndValidateRef from "../../hooks/useFetchDataAndValidateRef";

export interface ITokenProps {
  authCode: string;
}

const Token = (props: ITokenProps) => {
  const handleFetchedData = async () => {
    const token = await agent.Auth.token(props.authCode);
    TokenService.setToken(JSON.stringify(token));
    router.navigate(homepage);
  };

  useFetchDataAndValidateRef(handleFetchedData);

  return <></>;
};

export default Token;
