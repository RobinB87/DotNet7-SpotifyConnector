import TokenService from "../../services/tokenService";
import Token, { ITokenProps } from "./Token";
import SpotifyLogin from "./SpotifyLogin";
import Tracks from "../tracks/Tracks";

const Login = () => {
  const tokenProps: ITokenProps = {
    authCode: new URLSearchParams(window.location.search).get("code") ?? "",
  };

  return (
    <>{TokenService.tokenValid() ? <Tracks /> : tokenProps.authCode ? <Token {...tokenProps} /> : <SpotifyLogin />}</>
  );
};

export default Login;
