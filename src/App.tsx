import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Terminal } from './components/Terminal';
import { BenchmarkSimulator } from './components/BenchmarkSimulator';
import { TelemetryStreamer } from './components/TelemetryStreamer';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { PROJECTS, Project } from './data/projects';
import { soundFX } from './components/AudioEngine';
import {
  Cpu,
  Layers,
  Radio,
  Globe,
  Terminal as TerminalIcon,
  Shield,
  Zap,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const copyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText('ronronalds@saltobo.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    soundFX.playClick();

    try {
      const response = await fetch('https://formsubmit.co/ajax/ronronalds@saltobo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Transmission from ${formData.name} - Saltobo Systems`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (response.ok) {
        soundFX.playChirp(1040, 0.08);
        setContactSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Service responded with non-200 code');
      }
    } catch {
      // Clean fallback: open mailto link directly to ronronalds@saltobo.com
      window.location.href = `mailto:ronronalds@saltobo.com?subject=${encodeURIComponent(
        'Transmission from ' + formData.name + ' (Saltobo Systems)'
      )}&body=${encodeURIComponent(formData.message + '\n\nSender: ' + formData.name + ' (' + formData.email + ')')}`;
      setContactSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
        <ParticleCanvas />
        <div className="absolute inset-0 glow-gradient-radial pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-6 animate-pulse-subtle">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>RON RONALDS &bull; SALTOBO SYSTEMS (saltobo.com)</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Engineering <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">zero-overhead</span> runtimes & native toolchains.
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed mb-8 max-w-2xl">
              Architected by <span className="text-white font-semibold">Ron Ronalds</span> at <span className="text-cyan-300 font-semibold">Saltobo Systems</span>. From bare-metal UEFI enclaves and SIMD/CUDA vectorization to real-time CAN bus telemetry and high-throughput web fabrics.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#projects"
                onClick={() => soundFX.playClick()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Architecture</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <a
                href="#terminal"
                onClick={() => soundFX.playClick()}
                className="px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>Launch Shell</span>
              </a>
            </div>

            {/* Microarchitectural Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-md font-mono text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">DISPATCH P99</span>
                <span className="text-cyan-300 font-bold">&lt; 1.14 μs</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">MEMORY TOPOLOGY</span>
                <span className="text-purple-300 font-bold">Zero-Copy DMA</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">ENCLAVE BARRIER</span>
                <span className="text-amber-300 font-bold">Aegis Dual-Bank</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">CAN-FD BUS</span>
                <span className="text-emerald-300 font-bold">1 Mbps / 0 Loss</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TERMINAL SECTION */}
      <section id="terminal" className="py-16 bg-neutral-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>INTERACTIVE CLI EMULATOR</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Substrate Diagnostic Shell
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Explore projects, evaluate microbenchmarks, or inspect live telemetry through an interactive in-browser bash session.
            </p>
          </div>

          <Terminal />
        </div>
      </section>

      {/* HARDWARE BENCHMARK SIMULATOR */}
      <section id="benchmarks" className="py-16 bg-neutral-900/30 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BenchmarkSimulator />
        </div>
      </section>

      {/* TELEMETRY STREAMER */}
      <section id="telemetry" className="py-16 bg-neutral-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TelemetryStreamer />
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section id="projects" className="py-20 bg-neutral-900/20 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>TECHNICAL ARTIFACTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Engineering Systems
              </h2>
              <p className="text-neutral-400 text-sm mt-2 max-w-xl">
                High-performance architectures engineered for strict determinism, verifiable provenance, and zero runtime drag.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-900 p-1.5 rounded-xl border border-white/5 font-mono text-xs">
              {[
                { id: 'all', label: 'All Artifacts' },
                { id: 'systems', label: 'Systems & Kernel' },
                { id: 'ai', label: 'AI Silicon' },
                { id: 'hardware', label: 'Bus & Telemetry' },
                { id: 'web', label: 'Distributed Web' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCategory(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-cyan-500 text-neutral-950 font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => {
                  soundFX.playClick();
                  setActiveModalProject(p);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CORE COMPETENCIES MATRIX */}
      <section className="py-20 bg-neutral-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Architectural Skill Matrix
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              Deep, end-to-end domain proficiency across microarchitectural, protocol, and cloud layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Systems & Kernel</h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Deterministic bare-metal execution, driver architectures, and low-level runtime safety.
              </p>
              <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                <div className="p-1.5 bg-neutral-900/60 rounded">C99 / Rust / Zig</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">x86_64 / ARM64 Assembly</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">UEFI & ACPI Firmware</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">Linux VMM & eBPF</div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI & Acceleration</h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Roofline model optimization, asynchronous DMA streams, and fused tensor operations.
              </p>
              <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                <div className="p-1.5 bg-neutral-900/60 rounded">CUDA / TensorRT</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">AVX-512 & AVX2 SIMD</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">Ring Buffer Topologies</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">PyTorch & ONNX Runtimes</div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automotive Protocols</h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Mission-critical automotive bus capture, flow control, and diagnostic protocol gateways.
              </p>
              <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                <div className="p-1.5 bg-neutral-900/60 rounded">CAN 2.0B & CAN-FD</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">ISO-TP (ISO 15765-2)</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">UDS (ISO 14229)</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">SocketCAN & Kotlin Core</div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Distributed Web</h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                High-concurrency full-stack architectures with fluid UI motion and sub-second edge response.
              </p>
              <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                <div className="p-1.5 bg-neutral-900/60 rounded">React 19 & Next.js 16</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">TypeScript & Tailwind CSS</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">WebSockets & Web Workers</div>
                <div className="p-1.5 bg-neutral-900/60 rounded">Web Audio & Canvas 2D</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & CONNECT SECTION */}
      <section id="contact" className="py-20 bg-neutral-900/30 border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>DIRECT PROTOCOL DISPATCH</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Initiate Connection
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Available for low-level systems architecture consulting, AI inference acceleration, firmware development, and high-performance engineering collaborations.
              </p>

              {/* Direct Email Clipboard */}
              <div className="flex flex-wrap items-center gap-3 p-3.5 bg-neutral-900/90 rounded-xl border border-white/10 mb-8 font-mono text-sm">
                <span className="text-neutral-400 text-xs">Direct Address:</span>
                <span className="text-cyan-300 font-bold">ronronalds@saltobo.com</span>
                <span className="text-neutral-500 text-xs hidden sm:inline">&bull; saltobo.com</span>
                <button
                  onClick={copyEmail}
                  className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Contact Form */}
              {contactSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-mono flex items-center gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Transmission dispatched successfully.</div>
                    <div className="text-xs text-emerald-400/80 mt-1">
                      Signal routed directly to <span className="text-white font-semibold">ronronalds@saltobo.com</span>. Expect response within 24 hours.
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/ronronalds@saltobo.com"
                  method="POST"
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                >
                  {/* FormSubmit Configuration Fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Transmission - Saltobo Systems" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">IDENTIFIER / NAME</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">RETURN SIGNAL / EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">PAYLOAD / MESSAGE</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline project specifications, low-level architecture requirements, or advisory scope..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="text-xs font-mono text-amber-400 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Dispatching...' : 'Send Secure Dispatch'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-neutral-950 border-t border-white/5 font-mono text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Saltobo Systems &bull; Ron Ronalds &bull; saltobo.com &bull; 2026</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="#terminal" className="hover:text-cyan-400 transition-colors">
              Shell
            </a>
            <a href="#top" className="hover:text-cyan-400 transition-colors">
              Top &uarr;
            </a>
          </div>
        </div>
      </footer>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
