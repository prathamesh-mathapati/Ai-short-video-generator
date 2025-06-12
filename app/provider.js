"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/Authcontext";
import { auth } from "@/configs/firebaseConfig";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null)

  const CreateUser = useMutation(api.users.CreateNewUser)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      setUser(user)
      
      const result= await CreateUser({
        name:user?.displayName,
        email:user?.email,
        pictureURL:user?.photoURL
      })
    });
    return () => unsubscribe();
  }, []);
  return (
    <div >
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
         
        </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}