import { useGetCurrentUser } from "@/features/auth/api/get-current-user";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebaseConfig";
import { Loading } from "@/components/ui/loading";
import { useGetProjects } from "@/features/project";
import { useState } from "react";
import CreateProjectPopup from "@/features/project/components/create-project-popup";

const Projects = () => {
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { data: userData, isLoading: isLoadingUser } = useGetCurrentUser(uid!);
  console.log("The user data is : ", userData);
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects(
    userData?.projects || []
  );
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  if (isLoadingUser || isLoadingProjects) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col sm:px-15 md:px-25 lg:px-40 py-10 overflow-auto">
      <div className="font-extrabold text-slate-300 text-3xl mb-5 ml-2">
        Projects:
      </div>
      <div className="flex flex-wrap justify-start items-start w-full">
        <div
          key={"create-new-project"}
          onClick={onOpen}
          className="flex bg-slate-500/50 rounded-sm shadow-sm w-50 h-50 p-1.5 m-3 justify-center items-center text-2xl text-center overflow-clip font-bold text-slate-400 hover:text-slate-200 hover:border-2 cursor-pointer"
        >
          Create New Project
        </div>
        {projects!.map((project) => (
          <div
            key={project.id}
            className="flex bg-slate-500/50 rounded-sm shadow-sm w-50 h-50 p-1.5 m-3 justify-center items-center text-2xl text-center overflow-clip font-bold text-slate-400 hover:text-slate-200 hover:border-2 cursor-pointer"
            onClick={() => {
              navigate(`/project/${project.id}/sprints`);
            }}
          >
            {project.name}
          </div>
        ))}
      </div>
      <CreateProjectPopup uid={uid!} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Projects;
