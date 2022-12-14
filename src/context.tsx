import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";

type AuthContextType = {
  //currentUser: UserCredential | undefined;
  currentUser: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.ReactPortal> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState({
    name: "",
    message: "",
  });

  const login = async (email: string, password: string) => {
    setError({ name: "", message: "" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.message === "INVALID_PASSWORD") {
        setError({
          name: "Invalid Password",
          message: "You're password is incorrect!",
        });
      }
      if (err.message === "EMAIL_NOT_FOUND") {
        setError({
          name: "Email not Found",
          message: "No such email exist!",
        });
      }
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        console.log("logged in successful");
      } else {
        console.log("logging in failed");
        setCurrentUser("");
        logout();
      }

      return () => authChange();
    });
  }, []);

  console.log(currentUser);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
