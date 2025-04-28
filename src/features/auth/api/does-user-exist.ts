import { db } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["doesUserExist", uid],
    queryFn: () => doesUserExist(uid),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
