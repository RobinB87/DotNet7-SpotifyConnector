import Login from "./app/features/auth/Login";
import Tracks, { ITracksProps } from "./app/features/tracks/Tracks";
import "./App.css";

const App = () => {
  const tracksProps: ITracksProps = {
    authCode: new URLSearchParams(window.location.search).get("code"),
  };

  return <>{tracksProps.authCode ? <Tracks {...tracksProps} /> : <Login />}</>;
};

export default App;
