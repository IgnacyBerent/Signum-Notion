import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  const projects = [
    { projectName: "New Project", projectId: "0" },
    { projectName: "Prew", projectId: "1" },
    { projectName: "Signum Notion", projectId: "2" },
    { projectName: "GastroApp", projectId: "3" },
    { projectName: "Long Project Name", projectId: "4" },
    {
      projectName: "Very Super Long Project Name That is Unnecessary",
      projectId: "4",
    },
  ];
  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col sm:px-15 md:px-25 lg:px-40 py-10 overflow-auto">
      <div className="font-extrabold text-slate-300 text-3xl mb-5 ml-2">
        Projects:
      </div>
      <div className="flex flex-wrap justify-start items-start w-full">
        {projects.map((project) => (
          <div
            id={project.projectId}
            className="flex bg-slate-500/50 rounded-sm shadow-sm w-50 h-50 p-1.5 m-3 justify-center items-center text-2xl text-center overflow-clip font-bold text-slate-400 hover:text-slate-200 hover:border-2 cursor-pointer"
            onClick={() => {
              navigate(`/project/${project.projectId}/sprints`);
            }}
          >
            {project.projectName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
