import { useState, useEffect } from "react";
import { projects as mockProjects } from "../data/mockProject";

const ProjectsPage = () => {
  // Load projects from localStorage first; fallback to mockProjects
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : mockProjects;
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not Started");

  // Save projects to localStorage whenever projects state changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Function to assign progress based on status
  const getProgress = (status) => {
    switch (status) {
      case "Completed":
        return 100; 
      case "In Progress":
        return 50; 
      case "Not Started":
      default:
        return 0;  
    }
  };

  const addProject = () => {
    if (!title) return; 

    const newProject = {
      id: projects.length + 1,
      title,
      status,
      progress: getProgress(status),
    };

    setProjects([...projects, newProject]);
    setTitle("");
    setStatus("Not Started");
  };

  // Update project status
  const updateProjectStatus = (id, newStatus) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? {
            ...project,
            status: newStatus,
            progress: getProgress(newStatus),
          }
        : project
    );

    setProjects(updatedProjects);
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          Projects
        </h1>
        <p className="text-gray-400 text-sm">
          Create, track, and update your projects progress
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-lg font-semibold mb-4 text-white">Add New Project</h2>

      {/* Form to add project */}
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
        />

          <select
            defaultValue=""
            onChange={(e) =>
              updateProjectStatus(project.id, e.target.value)
            }
            className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 
                      text-gray-300 text-sm focus:outline-none 
                      focus:border-blue-500 cursor-pointer"
          >
            <option value="" disabled>
              Update status…
            </option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
      </div>

      <button
        className="mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
        onClick={addProject}
      >
        Add Project
      </button>
      </div>

      {/* Display projects */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="font-bold text-lg text-white mb-1">{project.title}</h2>
            <p className="text-sm text-gray-400 mb-3">Status: {project.status}</p>

            <div className="w-full h-3 bg-gray-700 rounded-full mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  project.progress === 100
                    ? "bg-green-500"
                    : project.progress === 50
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-300 mb-4">Progress: {project.progress}%</p>

            <select
              defaultValue=""
              onChange={(e) =>
                updateProjectStatus(project.id, e.target.value)
              }
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 
                        text-gray-300 text-sm focus:outline-none 
                        focus:border-blue-500 cursor-pointer"
            >
              <option value="" disabled>
                Update status…
              </option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <p className="text-sm">Progress: {project.progress}%</p>

            {/* Delete project button */}
            <button
              className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-500 transition"
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;