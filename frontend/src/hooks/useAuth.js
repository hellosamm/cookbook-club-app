import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookies] = useCookies(["authToken"]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies.authToken]);
  return { loggedIn, authToken: cookies.authToken };
};

export default useAuth;
