import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Header } from './_componet/Header'
import { Hero } from './_componet/Hero'

export const Provider = ({children}) => {
  return (
    <div className='container m-auto'>
        <NextThemesProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange >
            {children}
            <Header/>
            <Hero/>
        </NextThemesProvider>
        </div>
  )
}
