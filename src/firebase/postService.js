import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    getDocs,
    query,
    orderBy,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
 } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { uploadPostImage, deletePostImage } from "./storageService";

export const createPost = async ({ 
    title, 
    content, 
    user, 
    imageURL = "",
    imagePath = "",
 }) => {
    
    if (!user) throw new Error("Auth required to create a post.");
    if (!content?.trim()) throw new Error("Content is required.");

    const postData = {
        title: title?.trim() || "",
        content: content.trim(),
        imageURL,
        imagePath,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        authorPhotoURL: user.photoURL || "",
        likes: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, "posts"), postData);
    
    return { 
        id: docRef.id, 
        ...postData 
    };
};   

export const getPosts = async () => {
    const q = query(
        collection(db, "posts"), 
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

/* GET POST */
export const getPostById = async (id) => {
    const postRef = doc(db, "posts", id);
    const snap = await getDoc(postRef);

    if (!snap.exists()) return null;
    
    return { 
        id: snap.id, 
        ...snap.data() 
    };
};

export const deletePost = async (postId, imagePath) => {
    
    
    if (!postId) throw new Error("Unauthorized to delete this post.");
    
    if (imagePath) {
        await deletePostImage(imagePath);
    }
    
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
};

/* UPDATE POST */
export const updatePost = async ({
    postId, 
    title, 
    content, 
    image,
    user,
 }) => {

    if (!user) throw new Error("User is required to update a post.");

    const postRef = doc(db, "posts", postId);
    const snap = await getDoc(postRef);

    if (!snap.exists()) {
        throw new Error("Post not found");
    }
    
    const postData = snap.data();

    let imageURL = postData.imageURL || "";
    let imagePath = postData.imagePath || "";

    if (image) {
        // 🔥 eski image sil
        if (imagePath) {
            await deletePostImage(imagePath);
        }

        // 🔥 yeni image yükle
        const uploaded = await uploadPostImage(user.uid, image);
        imageURL = uploaded.imageURL;
        imagePath = uploaded.imagePath;
    }

    await updateDoc(postRef, {
        title,
        content,
        imageURL,
        imagePath,
        updatedAt: serverTimestamp(),
    });
    return true;

};

/* TOGGLE LIKE */
export const toggleLikePost = async (postId, userId, isLiked) => {

    if (!userId) throw new Error("User must be authenticated to like a post.");
    
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
        likes: isLiked 
            ? arrayRemove(userId) 
            : arrayUnion(userId),
    });
};
