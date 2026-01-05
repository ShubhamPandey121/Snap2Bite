export const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const isValidPassword = (pw: string) => pw.length >= 8;
export const compressImage = async (base64: string) => base64; // Placeholder; use expo-image-manipulator if needed