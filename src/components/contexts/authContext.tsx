import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create the AuthContext with the AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to log in a user
  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      // Example API call
      const response = await handleLoginApi(credentials);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user)); // Save user to localStorage
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  // Function to log out a user
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // Check if user is authenticated on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// A fake API login function to simulate authentication
const handleLoginApi = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: User }> => {
  return axios.post(
    "https://localhost:8080/instalearn/auth/login",
    credentials
  );
};
