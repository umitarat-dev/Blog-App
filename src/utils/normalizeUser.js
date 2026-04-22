export const normalizeUser = (user) => {
    if (!user) return null;

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerData?.[0]?.providerId,
    };
};