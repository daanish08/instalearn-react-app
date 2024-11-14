import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigateBasedOnRole = (role: string) => {
    if (role === "USER") navigate("/user/dashboard");
    else if (role === "ADMIN") navigate("/admin/dashboard");
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const response = await handleLoginApi(credentials);
      const token = response.data.jwt;
      const decodedToken: any = jwtDecode(token) as JwtPayload;

      const user = {
        id: decodedToken.sub,
        role: decodedToken.role,
      };

      setUser(user);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      navigateBasedOnRole(decodedToken.role);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const logout = (): void => {
    const roleLowerCase = user?.role?.toLowerCase();
    setUser(null);
    localStorage.removeItem("user");
    navigate(`${roleLowerCase}/login`);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userDetails = JSON.parse(storedUser);
      setUser(userDetails);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const handleLoginApi = async (credentials: {
  email: string;
  password: string;
}): Promise<{ data: { jwt: string } }> => {
  return axios.post("http://localhost:8080/instalearn/auth/login", credentials);
};
