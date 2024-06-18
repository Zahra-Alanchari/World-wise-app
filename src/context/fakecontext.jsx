import { createContext, useContext } from "react";

const AuthConntext = createContext;
export default function AuthProvider({ children }) {
  return <AuthConntext.Provider>{children}</AuthConntext.Provider>;
}
function useAuth() {
  const context = useContext(AuthConntext);
  if (context === undefined) throw new Error("opps!");
}
