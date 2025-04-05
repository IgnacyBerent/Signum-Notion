import { UserName } from "@/features/auth/types";
import { db } from "../../../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

export async function saveUserDetails(
  uid: string,
  userName: UserName
): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, userName);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function doesUserExist(uid: string): Promise<boolean> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists();
  } catch (e) {
    console.error("Error checking document: ", e);
    return false;
  }
}

export const useDoesUserExist = (uid: string) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => doesUserExist(uid),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
