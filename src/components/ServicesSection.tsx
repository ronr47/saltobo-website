import React from 'react';
import { SERVICES, ServiceOffering } from '../data/services';
import { Database, Bot, Eye, GraduationCap, Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { soundFX } from './AudioEngine';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const getIcon = (type: ServiceOffering['iconType']) => {
    switch (type) {
      case 'data':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'vision':
        return <Eye className="w-5 h-5 text-amber-400" />;
      case 'course':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getAccentColor = (type: ServiceOffering['iconType']) => {
    switch (type) {
      case 'data':
        return 'border-cyan-500/20 group-hover:border-cyan-500/40';
      case 'bot':
        return 'border-purple-500/20 group-hover:border-purple-500/40';
      case 'vision':
        return 'border-amber-500/20 group-hover:border-amber-500/40';
      case 'course':
        return 'border-emerald-500/20 group-hover:border-emerald-500/40';
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-900/40 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>CONSULTING & MENTORING TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI & Systems Engineering Services
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Specialized advisory, autonomous agent deployment, and rigorous low-level systems masterclasses engineered by Ron Ronalds.
            </p>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onBookService('custom-consulting');
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer self-start md:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation Session</span>
          </button>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`glass-panel rounded-3xl p-6 sm:p-8 border shadow-xl flex flex-col justify-between transition-all group ${getAccentColor(
                service.iconType
              )}`}
            >
              <div>
                {/* Top Badge & Rate */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
                    {getIcon(service.iconType)}
                    <span>{service.badge}</span>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-white font-bold">{service.pricing}</span>
                    <span className="text-neutral-500 block text-[10px]">{service.timeline}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.overview}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 mb-6 text-xs text-neutral-300">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer / Tech & Booking Button */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900/80 text-neutral-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    onBookService(service.id);
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-cyan-500/40 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:text-cyan-300"
                >
                  <span>Book this Track</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
