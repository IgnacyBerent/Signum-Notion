import { db } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "../types";

export async function getCurrentUser(uid: string): Promise<UserData> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.data() as UserData;
  } catch (e) {
    console.error("Error checking document: ", e);
    throw new Error("Error checking document");
  }
}

export const useGetCurrentUser = (uid: string) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["currentUser", uid],
    queryFn: () => getCurrentUser(uid),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
