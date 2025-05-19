
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verificationStatus?: "unverified" | "pending" | "verified";
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app with Supabase, you'd check for an existing session here
    // supabase.auth.getSession().then(({ data: { session } }) => {...})
    
    // For demo purposes, we'll check localStorage
    const storedUser = localStorage.getItem("infiworld_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Mock sign-in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you'd use Supabase auth here
      // This is a mock implementation
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        verificationStatus: "unverified"
      };
      
      setUser(mockUser);
      localStorage.setItem("infiworld_user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign-up function
  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you'd use Supabase auth here
      // This is a mock implementation
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: fullName,
        email,
        verificationStatus: "unverified"
      };
      
      setUser(mockUser);
      localStorage.setItem("infiworld_user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    // In a real app, you'd use Supabase auth here
    // await supabase.auth.signOut()
    
    localStorage.removeItem("infiworld_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
