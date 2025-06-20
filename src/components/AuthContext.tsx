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
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  roles: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [isLoggedIn, setIsLoggedIn] = useState(() => isTokenValid());

  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, [token]);

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRoles(payload.roles || []);
    } else {
      setRoles([]);
    }
  }, [token]);

  function isTokenValid(): boolean {
    return !!localStorage.getItem("token");
  }

  const login = (newToken: string) => {
    //Guardamos el token
    localStorage.setItem("token", newToken);
    setToken(newToken);

    //Guardamos los roles
    const payload = JSON.parse(atob(newToken.split(".")[1]));
    setRoles(payload.roles);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
