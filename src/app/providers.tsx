"use client";

import { SessionProvider } from "next-auth/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </NextThemesProvider>
    </SessionProvider>;
};
