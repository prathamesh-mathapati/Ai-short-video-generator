"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Header } from "./_componet/Header";
import { Hero } from "./_componet/Hero";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./_context/Authcontext";

export const Provider = ({ children }) => {
  const [user,setUser]=useState([])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      console.log(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="container m-auto">
      <AuthContext.Provider value={user}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Header />
        <Hero />
      </NextThemesProvider>
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContex=()=>{
  const context=useContext(AuthContext)
  return context
}