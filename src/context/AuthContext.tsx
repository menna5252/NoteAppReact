import { createContext, useContext, useEffect, useState } from "react";


type AuthContextType = {
    token: string | null;
    setToken: (token:string|null) => void;
}

export const AuthContext = createContext<AuthContextType|null>(null);



export default function AuthContextProvider({children}:{children:React.ReactNode}) {
  const [token, setToken] = useState<string|null>(null);
  useEffect(() => {
  if(localStorage.getItem('userToken')){
    setToken(localStorage.getItem('userToken'))}

  },[])
  return (
    <AuthContext.Provider value={{token, setToken}}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}
