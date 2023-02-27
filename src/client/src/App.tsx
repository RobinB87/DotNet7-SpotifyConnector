import Login from "./app/features/auth/Login";
import Token, { ITokenProps } from "./app/features/auth/Token";
import "./App.css";

const App = () => {
  const tokenProps: ITokenProps = {
    authCode: new URLSearchParams(window.location.search).get("code") ?? "",
  };

  return <>{tokenProps.authCode ? <Token {...tokenProps} /> : <Login />}</>;
};

export default App;
