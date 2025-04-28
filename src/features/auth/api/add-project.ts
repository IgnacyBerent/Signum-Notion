import { db } from "../../../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { UserData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

type AddProjectProps = {
  uid: string;
  projectId: string;
};

export async function addProject(
  addProjectProps: AddProjectProps
): Promise<UserData> {
  try {
    const userDocRef = doc(db, "users", addProjectProps.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      userData.projects.push(addProjectProps.projectId);
      await updateDoc(userDocRef, {
        projects: userData.projects,
      });
      return userData;
    } else {
      console.error("User document does not exist");
      throw new Error("User document does not exist");
    }
  } catch (e) {
    console.error("Error adding project: ", e);
    throw new Error("Error adding project");
  }
}

export const useAddProject = () => {
  return useMutation({
    mutationFn: (data: AddProjectProps) => addProject(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser", data.id], data);
    },
    onError: (error) => {
      console.error("Error adding project: ", error);
    },
  });
};
