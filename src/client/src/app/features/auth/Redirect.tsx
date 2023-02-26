import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) navigate("");
  }, [code]);

  return (
    <>
      <div>{code}</div>
    </>
  );
};

export default Redirect;
