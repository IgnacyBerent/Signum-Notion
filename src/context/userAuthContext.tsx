import React, { useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext } from "react";

type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  register: typeof register;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

export const UserAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  register,
  logOut,
  googleSignIn,
});

export const UserAuthProvider: React.FunctionComponent<
  IUserAuthProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The logged in user is: ", user);
        setUser(user);
      }

      return () => {
        unsubscribe();
      };
    });
  });
  const value: AuthContextData = {
    user,
    logIn,
    register,
    logOut,
    googleSignIn,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
