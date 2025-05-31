/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // const signInWithGoogle = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, googleProvider);
  // };

  const resetPassword = email => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // const logOut = async () => {
  //   setLoading(true);
  //   await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
  //     withCredentials: true,
  //   });
  //   return signOut(auth);
  // };
  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // Get token from server
  // const getToken = async email => {
  //   const { data } = await axios.post(
  //     `${import.meta.env.VITE_API_URL}/jwt`,
  //     { email },
  //     { withCredentials: true }
  //   );
  //   return data;
  // };
  // const saveUser = async user => {
  //   const currentUser = {
  //     email: user?.email,
  //     role: 'guest',
  //     status: 'Verified',
  //   };
  //   const { data } = await axios.put(
  //     `${import.meta.env.VITE_API_URL}/user`,
  //     currentUser
  //   );
  //   return data;
  // };
  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      // if (currentUser) {
      //   getToken(currentUser.email);
      //   saveUser(currentUser);
      // }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
