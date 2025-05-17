import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  // Add other fields if needed (like name, etc.)
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  signOut: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error("Failed to parse user from localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false); // Done loading from localStorage
  }, []);

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
