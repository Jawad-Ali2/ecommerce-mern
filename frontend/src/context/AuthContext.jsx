import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch("http://localhost:8000/home", {
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       const result = await res.json();
  //       setIsAuthenticated(result.isLoggedIn);
  //     }
  //   }

  //   getData();
  // }, []);

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
