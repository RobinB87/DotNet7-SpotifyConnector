import { homepage, router } from "../../router/Routes";
import TokenService from "../../services/tokenService";
import Token, { ITokenProps } from "./Token";
import SpotifyLogin from "./SpotifyLogin";

const Login = () => {
  const tokenProps: ITokenProps = {
    authCode: new URLSearchParams(window.location.search).get("code") ?? "",
  };

  if (TokenService.tokenValid()) router.navigate(homepage);

  return <>{tokenProps.authCode ? <Token {...tokenProps} /> : <SpotifyLogin />}</>;
};

export default Login;
