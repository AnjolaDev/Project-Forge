import { projects as mockProjects } from "../data/mockProject";
import { useState, useEffect } from "react";

const Dashboard = () => {
  // Projects state: merge mock and localStorage
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : mockProjects;
  });

// State to store reflections per project
const [reflections, setReflections] = useState(() => {
  const saved = localStorage.getItem("reflections");
  return saved ? JSON.parse(saved) : {};
});
// State to control input visibility
const [activeProjectId, setActiveProjectId] = useState(null);
const [reflectionText, setReflectionText] = useState("");

// Calculate summary metrics
const totalProjects = projects.length;
const completedProjects = projects.filter(p => p.status === "Completed").length;
const inProgressProjects = projects.filter(p => p.status === "In Progress").length;
const notStartedProjects = projects.filter(p => p.status === "Not Started").length;
 
// Keep projects in localStorage when changed
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

const saveReflection = (projectId) => {
  const updatedReflections = {
    ...reflections,
    [projectId]: reflectionText,
  };

  setReflections(updatedReflections);
  localStorage.setItem("reflections", JSON.stringify(updatedReflections));

  setReflectionText("");
  setActiveProjectId(null);
};

const deleteReflection = (projectId) => {
  const updatedReflections = {
    ...reflections
  };
  delete updatedReflections[projectId];

  setReflections(updatedReflections);
  localStorage.setItem("reflections", JSON.stringify(updatedReflections));

  if (activeProjectId === projectId) {
    setActiveProjectId(null);
    setReflectionText("");
  }
};

  return (
<div className="p-6">
{/* Dashboard Overview */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-xl shadow-md text-center">
    <h3 className="text-sm text-gray-400">Total Projects</h3>
    <p className="text-xl font-bold">{totalProjects}</p>
  </div>

  <div className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-4 rounded-xl shadow-md text-center">
    <h3 className="text-sm text-gray-400">Completed</h3>
    <p className="text-xl font-bold">{completedProjects}</p>
  </div>

  <div className="bg-gradient-to-br from-yellow-700 via-yellow-800 to-yellow-900 p-4 rounded-xl shadow-md text-center">
    <h3 className="text-sm text-gray-400">In Progress</h3>
    <p className="text-xl font-bold">{inProgressProjects}</p>
  </div>

  <div className="bg-gradient-to-br from-red-700 via-red-700 via-red-800 to-red-900 p-4 rounded-xl shadow-md text-center">
    <h3 className="text-sm text-gray-400">Not Started</h3>
    <p className="text-xl font-bold">{notStartedProjects}</p>
  </div>
</div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {projects.map((project) => (
    <div
      key={project.id}
      className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105"
    >
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-sm text-gray-400 mb-4">{project.status}</p>

      {/* Progress bar */}
      <div className="bg-gray-700 w-full h-4 rounded-full">
        <div
          className={`h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2 ${
            project.status === "Completed"
            ? "bg-green-500"
            : project.status === "In Progress"
            ? "bg-yellow-400"
            : "bg-red-500"
          }`}
          style={{ width: `${project.progress}%` }}
        >
            <span className="text-[10px] text-white font-semibold">{project.progress}%</span>
        </div>
      </div>

      {/* Add/Edit */}
<button
  className="mt-2 text-sm text-blue-400 hover:underline"
  onClick={() => {
    setActiveProjectId(project.id);
    setReflectionText(reflections[project.id] || "");
  }}
>
  {reflections[project.id] ? "Edit Reflection" : "Add Reflection"}
</button>

            {/* Reflection */}
            {activeProjectId === project.id && (
              <div className="mt-3">
                <textarea
                  className="w-full p-2 rounded bg-gray-800 text-sm text-white"
                  rows="3"
                  placeholder="What did you learn? Challenges faced?"
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                />

    <button
      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
      onClick={() => saveReflection(project.id)}
    >
      {reflections[project.id] ? "Update Reflection" : "Save Reflection"}
    </button>
              </div>
            )}

            {/* Saved reflection */}
            {reflections[project.id] && (
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-300">
      {reflections[project.id]}
    </p>

    <button
      onClick={() => deleteReflection(project.id)}
      className="text-xs text-red-400 hover:text-red-500"
    >
      Delete reflection
    </button>
  </div>
)}

    </div>
  ))}
</div>
</div>
 );
};

export default Dashboard;