import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  roles: string[];
  initializing: boolean; // 🚀 nuevo
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  roles: [],
  initializing: true, // 🚀 nuevo
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [initializing, setInitializing] = useState(true); // 🚀 nuevo

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setRoles(payload.roles || []);
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setRoles([]);
      setIsLoggedIn(false);
    }

    setInitializing(false); // 🚀 importante: marcamos que ya procesamos el token
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    const payload = JSON.parse(atob(newToken.split(".")[1]));
    setRoles(payload.roles || []);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRoles([]);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, roles, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
