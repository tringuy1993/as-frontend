import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebaseClient from "./firebaseClient";
import { setCookie } from "cookies-next";

const auth = getAuth(firebaseClient);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

const idToken = process.env.NEXT_PUBLIC_COOKIE_NAME;
export const AuthContextProvider = ({ user, children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user?.getIdToken();
        setUser(user);
        console.log("Auth Unsubscribe", token);
        setCookie("ASAuthToken", token);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  console.log(user, "AuthContext");
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
