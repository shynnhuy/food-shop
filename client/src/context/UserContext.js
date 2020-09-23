import React, { createContext, useEffect, useState } from "react";
import Api from "../Api";

const UserContext = createContext(null);
export default UserContext;

export const UserProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(UserReducer, initialState);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const tokenRes = await Api.post("/auth/checkToken", null);
      setUserData({
        isLoggedIn: tokenRes.data,
      });
      // console.log(tokenRes);
      if (tokenRes.data) {
        const res = await Api.get("/auth/userData");
        setUserData({
          isLoggedIn: true,
          data: res.data,
        });
      }
    };
    checkLoggedIn();
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
