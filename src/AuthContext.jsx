import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const signup = async (username) => {
    setError(null);
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Signup Failed");
      }

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        setLocation("TABLET");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, location, signup, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
