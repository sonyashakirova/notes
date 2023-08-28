import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "shared/config/firebase";
import { AuthContext } from "shared/hooks/useAuth";

export const withAuth = (component: () => React.ReactNode) => () => {
  const [user, setUser] = useState<FirebaseUser | undefined | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {component()}
    </AuthContext.Provider>
  );
};
