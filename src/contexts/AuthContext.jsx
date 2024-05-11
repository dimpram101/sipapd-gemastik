/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const user = auth.currentUser;
  
  useEffect(() => {
    const fetchUser = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      );
      setUsername(querySnapshot.docs[0].data().name);
    };
    if (user) fetchUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
}
