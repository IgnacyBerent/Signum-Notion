import { db } from "../../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { Project } from "../types";
import { queryClient } from "@/lib/react-query";

type CreateNewProjectProps = {
  uid: string;
  projectName: string;
};

export async function createNewProject(
  createNewProjectProps: CreateNewProjectProps
): Promise<Project> {
  try {
    const projectId = crypto.randomUUID();
    const newProject: Project = {
      id: projectId,
      name: createNewProjectProps.projectName,
      users: [createNewProjectProps.uid],
    };
    const projectDocRef = doc(db, "projects", projectId);
    await setDoc(projectDocRef, newProject);
    console.log("Project created successfully with ID: ", projectId);
    return newProject;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Error creating project");
  }
}

export const useCreateNewProject = () => {
  return useMutation({
    mutationFn: (data: CreateNewProjectProps) => createNewProject(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["projects"], (oldData: Project[]) =>
        oldData ? [...oldData, data] : oldData
      );
    },
    onError: (error) => {
      console.error("Error creating project: ", error);
    },
  });
};
