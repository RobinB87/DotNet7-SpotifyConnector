import { Outlet } from "react-router-dom";

import Login from "./app/features/auth/Login";
import Tracks, { ITracksProps } from "./app/features/tracks/Tracks";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <Outlet />
//     </div>
//   );
// }

const App = () => {
  const tracksProps: ITracksProps = {
    authCode: new URLSearchParams(window.location.search).get("code"),
  };

  return <>{tracksProps.authCode ? <Tracks {...tracksProps} /> : <Login />}</>;
};

export default App;
