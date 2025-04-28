import { db } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Project } from "../types";
import { useQuery } from "@tanstack/react-query";

export async function getProjects(ids: string[]): Promise<Project[]> {
  const projects: Project[] = [];
  try {
    for (const id of ids) {
      const projectDocRef = doc(db, "projects", id);
      const projectDoc = await getDoc(projectDocRef);
      if (projectDoc.exists()) {
        const projectData = projectDoc.data() as Project;
        projects.push(projectData);
      } else {
        console.error("No such document!");
      }
    }
    return projects;
  } catch (e) {
    console.error("Error checking document: ", e);
    return projects; // Return an empty array in case of error
  }
}

export const useGetProjects = (ids: string[]) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(ids),
    initialData: [],
    enabled: ids.length > 0,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
