import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider, 
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const registerUser = async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};

export const loginUser = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
    );
    return userCredential.user;
};

//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle (firebase->app->build->authentication->settings->authorized domain kısmında add domain..)
export const googleLoginUser = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
}

export const logoutUser = async () => {
    await signOut(auth);
};