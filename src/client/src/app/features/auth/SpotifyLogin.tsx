import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

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
        <Button href={uri} variant="contained" color="primary">
          Login with Spotify
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default SpotifyLogin;
