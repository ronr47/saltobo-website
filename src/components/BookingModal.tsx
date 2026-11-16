import React, { useState, useEffect } from 'react';
import { X, Calendar, Check, Send, Sparkles } from 'lucide-react';
import { soundFX } from './AudioEngine';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    service: preselectedService || 'data-whispering',
    timeframe: 'immediate',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundFX.playClick();

    try {
      await fetch('https://formsubmit.co/ajax/ronronalds@saltobo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Session Booking Request - ${formData.name} (${formData.service})`,
          name: formData.name,
          email: formData.email,
          organization: formData.organization || 'Independent',
          serviceTrack: formData.service,
          timeframe: formData.timeframe,
          projectScope: formData.details,
          _template: 'table',
        }),
      });

      soundFX.playChirp(1300, 0.09);
      setIsSubmitted(true);
    } catch {
      window.location.href = `mailto:ronronalds@saltobo.com?subject=${encodeURIComponent(
        'Session Booking: ' + formData.service + ' (' + formData.name + ')'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nOrg: ${formData.organization}\nTrack: ${formData.service}\nTimeframe: ${formData.timeframe}\n\nProject Scope:\n${formData.details}`
      )}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="glass-panel w-full max-w-xl rounded-2xl border border-cyan-500/30 p-6 sm:p-8 bg-neutral-950/98 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">Session Booking Received</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed max-w-md mx-auto">
              Your consultation request has been dispatched directly to <span className="text-cyan-400">ronronalds@saltobo.com</span>.
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              Ron Ronalds will review your technical specifications and respond with calendar coordinates within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-neutral-800 text-white font-mono text-xs font-bold hover:bg-neutral-700 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Saltobo Advisory Scheduler
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Book an Architecture Session
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6">
              Consult directly with Ron Ronalds on telemetry pipelines, local LLM agents, silicon acceleration, or intensive technical masterclasses.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Morgan Drake"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">DIRECT EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="morgan@laboratory.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">ORGANIZATION / COMPANY</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Robotics Lab / Enterprise OEM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">SERVICE TRACK / DISCIPLINE</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="data-whispering">Data Whispering & Telemetry Pipelines</option>
                  <option value="chatbot-setup">Autonomous Chatbots & Local LLM Runtimes</option>
                  <option value="vision-boost">Vision Boost & Edge Computer Vision</option>
                  <option value="workshops-courses">Systems Engineering Workshops & Courses</option>
                  <option value="custom-consulting">Custom Bare-Metal / Firmware Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">TARGET TIMEFRAME</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'immediate', label: 'Next 7 Days' },
                    { id: '2-4weeks', label: '2-4 Weeks' },
                    { id: 'flexible', label: 'Quarterly Planning' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormData({ ...formData, timeframe: t.id })}
                      className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                        formData.timeframe === t.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                          : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">PROJECT SCOPE & OBJECTIVES</label>
                <textarea
                  required
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Outline hardware constraints, target throughput/accuracy metrics, or specific cohort requirements..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 active:scale-95 transition-all mt-4"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Request...' : 'Dispatch Session Booking'}</span>
              </button>

              <div className="text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Direct dispatch to ronronalds@saltobo.com &bull; Zero spam guarantee</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
