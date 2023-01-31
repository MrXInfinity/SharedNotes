import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

type AuthContextType = {
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
      console.log(err.message);
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

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
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
        console.log(user);
      } else {
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
