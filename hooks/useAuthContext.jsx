import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw Error("useAuthContext must be used within AuthContextProvider");
  return context;
};

export default useAuthContext;
