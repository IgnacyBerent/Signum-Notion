import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateNewProject } from "../api/create-new-project";
import { useAddProject } from "@/features/auth";
import { Project } from "../types";
import { useNavigate } from "react-router-dom";

type CreateProjectPopupProps = {
  uid: string;
  isOpen: boolean;
  onClose: () => void;
};

const CreateProjectPopup = ({
  uid,
  isOpen,
  onClose,
}: CreateProjectPopupProps) => {
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState<string>("");
  const { mutate: createProject } = useCreateNewProject();
  const { mutate: addProject } = useAddProject();

  const handleNewProject = () => {
    createProject(
      { uid: uid, projectName: newProjectName },
      {
        onSuccess: (data: Project) => {
          addProject(
            { uid: uid, projectId: data.id },
            {
              onSuccess: () => {
                navigate(`/project/${data.id}/team`);
              },
            }
          );
        },
      }
    );
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="w-fit h-fit p-3 z-999 fixed top-1/2 left-1/2 bg-slate-600/85 rounded-sm shadow-2xl transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col justify-center items-center p-3 relative">
            <div className="absolute -right-2 -top-2 hover:cursor-pointer flex justify-center items-center">
              <div className="relative group">
                <div className="rounded-full border w-4.5 h-4.5 mt-0.5 border-slate-900 group-hover:border-slate-200" />
                <a
                  className="rounded-full font-medium text-xl text-slate-900 absolute inset-0 flex justify-center items-center group-hover:text-slate-200"
                  onClick={onClose}
                >
                  x
                </a>
              </div>
            </div>
            <a className="font-bold text-3xl text-slate-300 mb-2">
              New Project Name
            </a>
            <Input
              id="project-name"
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Button className="mt-3 w-full" onClick={handleNewProject}>
              CREATE!
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProjectPopup;
