import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

// Define types for the context values
interface AuthContextType {
  user: string | null; 
  setUser: React.Dispatch<React.SetStateAction<string | null>>; 
  scanResult: boolean;
  setScanResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null); 
  const [scanResult, setScanResult] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ user, setUser ,scanResult, setScanResult }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
