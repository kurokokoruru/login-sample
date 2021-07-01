import React, { useState } from "react";

export const LoginContext = React.createContext({
  login: false,
  setLogin: (login: any) => {}
});

export const LoginContextProvider = (props: any) => {
  const setLogin = (login: any) => {
    setState({ ...state, login });
  };

  const initState = {
    login: false,
    setLogin: setLogin
  };

  const [state, setState] = useState(initState);
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
};