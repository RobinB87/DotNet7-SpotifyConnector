import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import agent from "../../api/agent";

const Login = () => {
  // const navigate = useNavigate();
  // const handleClick = async () => {};

  const [uri, setUri] = useState("");
  useEffect(() => {
    async function getUri() {
      setUri(await agent.Auth.login());
    }

    getUri();
  }, []);

  return (
    <>
      {/* <button 
        onClick={() => {
          handleClick();
        }}
      >
        Login
      </button> */}
      <a href={uri}>Login with Spotify</a>
    </>
  );
};

export default Login;
