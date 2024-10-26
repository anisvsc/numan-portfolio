import React from 'react';

const skillsData = [
  { title: "JavaScript", description: "Dynamic web applications." },
  { title: "React", description: "Building user interfaces." },
  { title: "Next.js", description: "Server-side rendering." },
  { title: "Node.js", description: "Backend development." },
  { title: "Tailwind CSS", description: "Utility-first CSS framework." },
  { title: "Git", description: "Version control." },
  { title: "Express", description: "Web application framework." },
  { title: "MongoDB", description: "NoSQL database." },
];

const SkillsSection: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800">{skill.title}</h3>
            <p className="text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
