import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'highlight';
  text: string;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '╔══════════════════════════════════════════════════════════════════════╗' },
    { id: '2', type: 'system', text: '║  SALTOBO SYSTEMS SHELL v3.4.1 (saltobo.com / Aegis Enclave v2)       ║' },
    { id: '3', type: 'system', text: '║  Engineer: Ron Ronalds | Type "help" for diagnostic commands.        ║' },
    { id: '4', type: 'system', text: '╚══════════════════════════════════════════════════════════════════════╝' },
    { id: '5', type: 'output', text: 'Status: 0 errors detected. SIMD registers (AVX-512) ready. P99 < 1.2μs.' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to history
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Echo input
    const newLines: TerminalLine[] = [
      ...lines,
      { id: Date.now().toString(), type: 'input', text: `ron@saltobo:~$ ${trimmed}` },
    ];

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Available commands:' },
          { id: Math.random().toString(), type: 'output', text: '  whoami          - Read engineer bio and core competencies' },
          { id: Math.random().toString(), type: 'output', text: '  projects        - List systems, AI, and hardware projects' },
          { id: Math.random().toString(), type: 'output', text: '  cat <id>        - Inspect technical spec of a project' },
          { id: Math.random().toString(), type: 'output', text: '  skills          - Print architectural skill matrix' },
          { id: Math.random().toString(), type: 'output', text: '  bench           - Execute SIMD / PCIe bandwidth throughput test' },
          { id: Math.random().toString(), type: 'output', text: '  status          - Display real-time telemetry and hardware status' },
          { id: Math.random().toString(), type: 'output', text: '  clear           - Wipe console buffer' },
          { id: Math.random().toString(), type: 'output', text: '  contact         - Display connection endpoints' },
        );
        break;

      case 'whoami':
      case 'about':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Ron Ronalds // Systems Architect & Low-Level Infrastructure Engineer' },
          { id: Math.random().toString(), type: 'system', text: 'Organization: Saltobo Systems (saltobo.com)' },
          { id: Math.random().toString(), type: 'output', text: 'Specializing in deterministic systems execution, low-latency AI inference,' },
          { id: Math.random().toString(), type: 'output', text: 'bare-metal UEFI enclaves, high-speed telemetry (CAN/UDS/PCIe), and modern' },
          { id: Math.random().toString(), type: 'output', text: 'distributed web fabrics.' },
        );
        break;

      case 'projects':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Registered Engineering Projects:' },
          ...PROJECTS.map(p => ({
            id: Math.random().toString(),
            type: 'output' as const,
            text: `  [${p.id.padEnd(18)}] ${p.title} (${p.status}) - ${p.tagline}`,
          })),
          { id: Math.random().toString(), type: 'system', text: 'Tip: Use "cat <id>" (e.g. "cat linum-hybrid") for full architecture breakdowns.' }
        );
        break;

      case 'cat':
        if (!args[0]) {
          newLines.push({ id: Math.random().toString(), type: 'error', text: 'Usage: cat <project-id>  (e.g., "cat linum-hybrid", "cat r2-compiler")' });
        } else {
          const project = PROJECTS.find(p => p.id.toLowerCase() === args[0].toLowerCase());
          if (project) {
            newLines.push(
              { id: Math.random().toString(), type: 'highlight', text: `=== ${project.title} [${project.status}] ===` },
              { id: Math.random().toString(), type: 'output', text: project.longDescription },
              { id: Math.random().toString(), type: 'system', text: `Tech Stack: ${project.technologies.join(', ')}` },
              { id: Math.random().toString(), type: 'output', text: 'Key Metrics:' },
              ...project.metrics.map(m => ({
                id: Math.random().toString(),
                type: 'output' as const,
                text: `  * ${m.label}: ${m.value}`,
              })),
            );
          } else {
            newLines.push({ id: Math.random().toString(), type: 'error', text: `Error: Project "${args[0]}" not found. Run "projects" to list valid IDs.` });
          }
        }
        break;

      case 'skills':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Technical Arsenal & Stack:' },
          { id: Math.random().toString(), type: 'output', text: '  [SYSTEMS & KERNEL]   C99, Rust, Zig, x86_64/ARM64 ASM, Linux Kernel, eBPF, UEFI' },
          { id: Math.random().toString(), type: 'output', text: '  [AI & SIMD COMPUTE]  CUDA, TensorRT, AVX-512/AVX2, ONNX, PyTorch, Roofline Analysis' },
          { id: Math.random().toString(), type: 'output', text: '  [TELEMETRY & BUS]    ISO-TP, UDS (ISO 14229), CAN 2.0B/FD, PCIe DMA, SocketCAN' },
          { id: Math.random().toString(), type: 'output', text: '  [WEB & PLATFORM]     TypeScript, React 19, Next.js, Tailwind CSS, WebSockets' },
        );
        break;

      case 'bench':
        newLines.push(
          { id: Math.random().toString(), type: 'system', text: '[SIMD EXECUTION BENCHMARK INITIATED]' },
          { id: Math.random().toString(), type: 'output', text: '>> Allocating 64MB 64-byte aligned ring buffer (pinned)... Done.' },
          { id: Math.random().toString(), type: 'output', text: '>> Warmup run: 1,000,000 iterations AVX-512 FMA: 0.82 ms' },
          { id: Math.random().toString(), type: 'output', text: '>> PCIe Gen5 Host-to-Device bidirectional DMA stream: 61.4 GB/s (98.2% saturation)' },
          { id: Math.random().toString(), type: 'highlight', text: '>> Benchmark Result: ZERO-DROPPED FRAMES | P99 LATENCY: 0.94 μs' },
        );
        break;

      case 'status':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'LIVE HARDWARE & RUNTIME TELEMETRY:' },
          { id: Math.random().toString(), type: 'output', text: '  Uptime:             99.998% (Sovereign Node)' },
          { id: Math.random().toString(), type: 'output', text: '  Kernel Target:      Linux 6.8.x-hardened x86_64' },
          { id: Math.random().toString(), type: 'output', text: '  Security Enclave:   Aegis Sealed / Dual-Bank Validated' },
          { id: Math.random().toString(), type: 'output', text: '  Telemetry Status:   CAN Bus Online / 1Mbps / 0 Frame Drops' },
          { id: Math.random().toString(), type: 'output', text: '  SIMD Capabilities:  AVX-512F, AVX-512BW, AVX-512CD, AVX-512DQ' },
        );
        break;

      case 'contact':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Connection Endpoints:' },
          { id: Math.random().toString(), type: 'output', text: '  Engineer:           Ron Ronalds' },
          { id: Math.random().toString(), type: 'output', text: '  Email:              ronronalds@saltobo.com' },
          { id: Math.random().toString(), type: 'output', text: '  Organization:       Saltobo Systems (saltobo.com)' },
          { id: Math.random().toString(), type: 'output', text: '  GitHub:             github.com/ron' },
          { id: Math.random().toString(), type: 'output', text: '  PGP Fingerprint:    4E89 1B7C 920A 5DF3 E104 B832 7701 CC94' },
          { id: Math.random().toString(), type: 'system', text: 'Use the contact form below or dispatch encrypted signals directly.' }
        );
        break;

      case 'clear':
        setLines([]);
        setInput('');
        return;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: `bash: command not found: "${cmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim();
      const candidates = ['help', 'whoami', 'projects', 'cat', 'skills', 'bench', 'status', 'contact', 'clear'];
      const match = candidates.find(c => c.startsWith(current.toLowerCase()));
      if (match) {
        setInput(match + ' ');
      }
    }
  };

  return (
    <div
      className={`glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 font-mono text-sm transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 flex flex-col bg-neutral-950/95' : 'w-full'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>ron@saltobo-node:~ (bash)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 hidden sm:inline-block">
            AVX-512 ACTIVE
          </span>
          <button
            onClick={() => setLines([])}
            title="Clear buffer"
            className="p-1 hover:text-neutral-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Restore window' : 'Maximize terminal'}
            className="p-1 hover:text-neutral-200 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className={`p-4 overflow-y-auto space-y-1 bg-neutral-950/90 select-text ${
          isExpanded ? 'flex-1' : 'h-80'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed break-words">
            {line.type === 'input' && (
              <span className="text-cyan-400 font-semibold">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-cyan-600/80">{line.text}</span>
            )}
            {line.type === 'highlight' && (
              <span className="text-amber-300 font-medium">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-neutral-300">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-rose-400">{line.text}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/70 border-t border-white/5">
        <span className="text-cyan-400 font-bold select-none text-xs sm:text-sm">ron@saltobo:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'bench', 'projects', 'status'..."
          className="flex-1 bg-transparent text-neutral-100 outline-none font-mono text-sm placeholder:text-neutral-600 focus:placeholder:text-neutral-700"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="text-[11px] text-neutral-500 hidden sm:inline select-none">
          Press [Enter] or [Tab]
        </span>
      </div>
    </div>
  );
};
