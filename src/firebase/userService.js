import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUserIfNotExists = async(authUser) => {
    
    if (!authUser) return null;

    const userRef = doc(db, "users", authUser.uid);
    const userSnap = await getDoc(userRef);

    //! Kullanıcı yoksa oluştur
    if (!userSnap.exists()) {
        const newUser = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "",
            photoURL: authUser.photoURL || "",
            role: "user",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, newUser);

        const freshSnap = await getDoc(userRef);
        return normalizeFirestoreUser(freshSnap.data());
    }

    // ✅ Varsa mevcut user'ı dön
    // return userSnap.data();
    return normalizeFirestoreUser(userSnap.data());
};


export const updateUserProfile = async(uid, data) => {
    
    if (!uid) throw new Error("UID is required");

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),    
    });

    return normalizeFirestoreUser({
        uid,
        ...data,
        updatedAt: {
            toMillis: () => Date.now(),
        },
    });
};


const normalizeFirestoreUser = (data) => {
  if (!data) return null;

  return {
    ...data,
    createdAt: data.createdAt?.toMillis
      ? data.createdAt.toMillis()
      : null,
    updatedAt: data.updatedAt?.toMillis
      ? data.updatedAt.toMillis()
      : null,
  };
};