import React from 'react';
import { Project } from '../data/projects';
import { ChevronRight, Cpu, Layers, Radio, Globe } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'systems':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ai':
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
      case 'hardware':
        return <Radio className="w-3.5 h-3.5 text-amber-400" />;
      case 'web':
        return <Globe className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Gold Master':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Production':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Active Research':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'Deployed':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Top accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/5 text-xs font-mono text-neutral-300">
            {getCategoryIcon(project.category)}
            <span className="capitalize">{project.category}</span>
          </div>

          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-neutral-400 text-sm leading-relaxed mb-5 line-clamp-2">
          {project.tagline}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-neutral-900/70 rounded-xl border border-white/5 mb-5 font-mono">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-left">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider truncate">
                {metric.label}
              </div>
              <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Tech Tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center text-xs font-medium text-cyan-400 group-hover:text-cyan-300 pt-3 border-t border-white/5">
          <span>View architecture breakdown</span>
          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
