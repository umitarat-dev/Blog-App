import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../features/auth/authSlice";
// import { normalizeUser } from "../utils/normalizeUser";
import { createUserIfNotExists } from "../firebase/userService";

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(authUser)=>{
            if (!authUser) {
                dispatch(setUser(null));
                return
            }

            const firestoreUser = await createUserIfNotExists(authUser);
            dispatch(setUser(firestoreUser));
        });

        return () => unsubscribe();
    }, [dispatch]);
};

export default useAuthListener;