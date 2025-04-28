import { UserData } from "@/features/auth/types";
import { db } from "../../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export async function saveUser(userData: UserData): Promise<UserData> {
  try {
    const userDocRef = doc(db, "users", userData.id);
    await setDoc(userDocRef, userData);
    return userData;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Error saving user data");
  }
}

export const useSaveUser = () => {
  return useMutation({
    mutationFn: (userData: UserData) => saveUser(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser", data.id], data);
      queryClient.setQueryData(["doesUserExist", data.id], true);
    },
    onError: (error) => {
      console.error("Error saving user data", error);
    },
  });
};
