import Api from "Api";
import React, { useEffect, useReducer } from "react";
import AuthReducer, { initialState } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const tokenRes = await Api.post("/auth/checkToken", null);
      // console.log(tokenRes);
      if (tokenRes.data) {
        const res = await Api.get("/auth/userData");
        const data = res.data;
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("auth-token", data.token);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
