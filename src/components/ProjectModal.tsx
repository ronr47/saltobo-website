import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { X, Check, ShieldCheck, Cpu, Code2, FileCode } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="glass-panel w-full max-w-2xl rounded-2xl border border-cyan-500/30 p-6 sm:p-8 bg-neutral-950/98 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status, Category & Real Source File */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 border border-white/10 text-cyan-400 uppercase">
            {project.category}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
            {project.status}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 text-neutral-400 border border-white/5 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>{project.sourceFile}</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {project.title}
        </h2>
        <p className="text-cyan-400 font-mono text-sm mb-6">{project.tagline}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-900/80 border border-white/5 mb-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">{m.label}</div>
              <div className="text-sm sm:text-base font-bold text-white mt-1 font-mono">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Real Code Excerpt from Host File */}
        {project.realCodeSnippet && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-2">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Verified Host Code Excerpt</span>
              </span>
              <span className="text-[11px] text-neutral-500">{project.sourceFile}</span>
            </div>
            <pre className="p-4 rounded-xl bg-neutral-900/90 border border-white/10 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
              <code>{project.realCodeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Deep Dive Description */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Architecture & Microbenchmarks</span>
          </h4>
          <p className="text-neutral-300 text-sm leading-relaxed mb-4">
            {project.longDescription}
          </p>
        </div>

        {/* Technical Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Key Substrate Invariants</span>
          </h4>
          <div className="space-y-2">
            {project.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Stack */}
        <div className="pt-4 border-t border-white/10">
          <div className="text-xs font-mono text-neutral-400 mb-2">Validated Toolchain & Dialect:</div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-200 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
