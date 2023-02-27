import { useEffect, useRef, useState } from "react";

import agent from "../../api/agent";

const SpotifyLogin = () => {
  const dataFetchedRef = useRef(false);
  const [uri, setUri] = useState("");

  const fetchData = async () => {
    setUri(await agent.Auth.login());
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return (
    <>
      {uri ? (
        <a href={uri}>
          <button>Login with Spotify</button>
        </a>
      ) : (
        ""
      )}
    </>
  );
};

export default SpotifyLogin;
