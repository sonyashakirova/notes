import { AuthContext, login, logout, register } from "features/handle-auth";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "shared/config/firebase";

export const withAuth = (component: () => React.ReactNode) => () => {
  const [user, setUser] = useState<FirebaseUser | undefined | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {component()}
    </AuthContext.Provider>
  );
};
