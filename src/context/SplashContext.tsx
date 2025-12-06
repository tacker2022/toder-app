"use client";

import React, { createContext, useContext, useState, PropsWithChildren } from "react";

interface SplashContextType {
    isSplashFinished: boolean;
    setSplashFinished: (value: boolean) => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: PropsWithChildren) {
    const [isSplashFinished, setSplashFinished] = useState(false);

    return (
        <SplashContext.Provider value={{ isSplashFinished, setSplashFinished }}>
            {children}
        </SplashContext.Provider>
    );
}

export function useSplash() {
    const context = useContext(SplashContext);
    if (context === undefined) {
        throw new Error("useSplash must be used within a SplashProvider");
    }
    return context;
}
