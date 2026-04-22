import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "./firebaseConfig";
import { deleteObject } from "firebase/storage";


/* =========================
   Profile Photo Upload
========================= */
export const uploadProfilePhoto = async ( uid, file ) => {
    
    const user = auth.currentUser;

    if ( !user ) throw new Error("User not authenticated");

    const fileRef = ref(
        storage, 
        `profilePhotos/${user.uid}/avatar.jpg`);
    
    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;   
};

/* =========================
   Post Image Upload
========================= */
export const uploadPostImage = async ( uid, file ) => {
    const imagePath = `postImages/${uid}/${Date.now()}_${file.name}`;
    const imageRef = ref(storage, imagePath);
    
    await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);

    return {
        imageURL,
        imagePath,
    };
};


/* =========================
   Post Image Upload + Delete
========================= */

export const deletePostImage = async (imagePath) => {
    if (!imagePath) return;

    try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
    } catch (error) {
        if (error.code === "storage/object-not-found") {
            // zaten yok → sessiz geç
            console.warn("Image already deleted or not found.");
        } else {
            console.error("Failed to delete post image:", error);// gerçek hata varsa patlasın
        }
     }
};
