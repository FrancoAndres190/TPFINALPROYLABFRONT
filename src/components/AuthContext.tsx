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
  membershipActive: boolean;
  initializing: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  roles: [],
  membershipActive: false,
  initializing: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [membershipActive, setMembershipActive] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setRoles(payload.roles || []);
      setMembershipActive(payload.membershipActive === true);
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setRoles([]);
      setMembershipActive(false);
      setIsLoggedIn(false);
    }

    setInitializing(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    const payload = JSON.parse(atob(newToken.split(".")[1]));
    setRoles(payload.roles || []);
    setMembershipActive(payload.membershipActive === true);
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
      value={{
        isLoggedIn,
        token,
        roles,
        membershipActive,
        initializing,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
