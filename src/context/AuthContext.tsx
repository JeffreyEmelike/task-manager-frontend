import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";
import {
  saveTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from "../utils/tokens";
import { registerApi, loginApi, logoutApi } from "../api/auth";

// Shape of what the context provides to components
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, check if user is already logged in
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      // Decode the JWT to get user info
      // For now set a placeholder
      setUser({
        _id: "",
        name: "User",
        email: "",
        role: "member",
        workspaces: [],
        createdAt: "",
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const tokens = await loginApi({ email, password });
    saveTokens(tokens.accessToken, tokens.refreshToken);
    setUser({
      _id: "",
      name: email,
      email,
      role: "member",
      workspaces: [],
      createdAt: "",
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const tokens = await registerApi({ name, email, password });
    saveTokens(tokens.accessToken, tokens.refreshToken);
    setUser({
      _id: "",
      name,
      email,
      role: "member",
      workspaces: [],
      createdAt: "",
    });
  };

  const logout = async (): Promise<void> => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await logoutApi(refreshToken);
      } catch {
        /* server down - still clear locally */
      }
    }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook - cleaner than useContext(AuthContext) everywhere
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth muat be used inside AuthProvider");
  return ctx;
};
