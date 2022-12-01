import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

type AuthContextType = {
  currentUser: UserCredential | undefined;
  login: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.ReactPortal> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserCredential>();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
