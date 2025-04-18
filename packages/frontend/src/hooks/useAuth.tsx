import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@signageos/sample-app-common/src/user";
import { login as apiLogin, logout as apiLogout, getCurrentUser } from "../api";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError("Failed to fetch auth status");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (nickname: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await apiLogin(nickname, password);
      if (user) {
        setUser(user);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Logout failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}