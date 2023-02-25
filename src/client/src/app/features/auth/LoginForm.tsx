import { useEffect, useState } from "react";

import agent from "../../api/agent";

export const LoginForm = () => {
  const [uri, setUri] = useState("");

  const handleClick = async () => {
    setUri(await agent.Auth.login());
  };

  useEffect(() => {
    if (uri) window.open(uri, "_blank");
  }, [uri]);

  return (
    <>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Login
      </button>
    </>
  );
};

export default LoginForm;
