import { createContext, useCallback, useContext, useRef } from "react";

interface TransitionContextValue {
  navigateTo: (path: string) => void;
  registerCover: (fn: (path: string) => void) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  registerCover: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const coverFnRef = useRef<((path: string) => void) | null>(null);

  const registerCover = useCallback((fn: (path: string) => void) => {
    coverFnRef.current = fn;
  }, []);

  const navigateTo = useCallback((path: string) => {
    coverFnRef.current?.(path);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigateTo, registerCover }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
