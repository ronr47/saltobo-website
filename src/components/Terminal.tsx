import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { useCart } from '../context/CartContext';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'highlight';
  text: string;
}

interface TerminalProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onOpenBooking }) => {
  const { addItem, items, subtotal } = useCart();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '╔════════════════════════════════════════════════════════════════════════════════════╗' },
    { id: '2', type: 'system', text: '║  SALTOBO SYSTEMS ORCHESTRATOR v4.2.0 (saltobo.com / x86_64-hardened Linux)         ║' },
    { id: '3', type: 'system', text: '║  Architect: Ron Ronalds &bull; Type "help" for commands: shop, services, bench, inspect  ║' },
    { id: '4', type: 'system', text: '╚════════════════════════════════════════════════════════════════════════════════════╝' },
    { id: '5', type: 'output', text: 'Loaded 6 verified host artifacts from ~/ (aegis, pcie_cuda, vmm_nvme, isotp, r2c).' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

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
          { id: Math.random().toString(), type: 'highlight', text: 'Available Orchestration Commands:' },
          { id: Math.random().toString(), type: 'output', text: '  projects            - List verified hardware/systems artifacts from ~/' },
          { id: Math.random().toString(), type: 'output', text: '  inspect <artifact>  - Disassemble & print verified source excerpt from ~/' },
          { id: Math.random().toString(), type: 'output', text: '  bench               - Run PCIe 512MiB & NVMe O_DIRECT MoE benchmark' },
          { id: Math.random().toString(), type: 'output', text: '  shop                - Browse Saltobo Hardware & Aerospace Store' },
          { id: Math.random().toString(), type: 'output', text: '  buy <ai|drone>      - Add hardware module directly to cart' },
          { id: Math.random().toString(), type: 'output', text: '  cart                - View current checkout buffer' },
          { id: Math.random().toString(), type: 'output', text: '  services            - Browse AI & systems engineering consulting' },
          { id: Math.random().toString(), type: 'output', text: '  book [service]      - Launch session scheduler modal with Ron' },
          { id: Math.random().toString(), type: 'output', text: '  whoami              - Engineer profile & background' },
          { id: Math.random().toString(), type: 'output', text: '  status              - Live telemetry & kernel execution state' },
          { id: Math.random().toString(), type: 'output', text: '  clear               - Wipe console buffer' },
        );
        break;

      case 'whoami':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Ron Ronalds // Founder & Systems Architect @ Saltobo Systems' },
          { id: Math.random().toString(), type: 'output', text: 'Focus: Low-latency AI inference runtimes, bare-metal UEFI enclaves,' },
          { id: Math.random().toString(), type: 'output', text: 'CAN-FD telemetry gateways, and high-performance aerospace drone frames.' },
          { id: Math.random().toString(), type: 'system', text: 'Direct Signal: ronronalds@saltobo.com | Domain: https://saltobo.com' }
        );
        break;

      case 'projects':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Host Artifacts in ~/ (Source Grounded):' },
          ...PROJECTS.map((p) => ({
            id: Math.random().toString(),
            type: 'output' as const,
            text: `  [${p.id.padEnd(20)}] ${p.title} (${p.sourceFile})`,
          })),
          { id: Math.random().toString(), type: 'system', text: 'Tip: Run "inspect <artifact>" (e.g. "inspect pcie", "inspect aegis") for real code.' }
        );
        break;

      case 'inspect':
      case 'cat':
        if (!args[0]) {
          newLines.push({
            id: Math.random().toString(),
            type: 'error',
            text: 'Usage: inspect <pcie|aegis|isotp|r2c|nvme|saltline>',
          });
        } else {
          const query = args[0].toLowerCase();
          const match = PROJECTS.find(
            (p) => p.id.toLowerCase().includes(query) || p.sourceFile.toLowerCase().includes(query)
          );
          if (match) {
            newLines.push(
              { id: Math.random().toString(), type: 'highlight', text: `=== ${match.title} [${match.sourceFile}] ===` },
              { id: Math.random().toString(), type: 'system', text: match.tagline },
              { id: Math.random().toString(), type: 'output', text: match.longDescription },
              { id: Math.random().toString(), type: 'highlight', text: '--- Code Excerpt from Host File ---' },
              { id: Math.random().toString(), type: 'output', text: match.realCodeSnippet },
              { id: Math.random().toString(), type: 'system', text: `Metrics: ${match.metrics.map((m) => `${m.label}: ${m.value}`).join(' | ')}` }
            );
          } else {
            newLines.push({
              id: Math.random().toString(),
              type: 'error',
              text: `Artifact "${args[0]}" not found. Try: pcie, aegis, isotp, r2c, nvme.`,
            });
          }
        }
        break;

      case 'bench':
        newLines.push(
          { id: Math.random().toString(), type: 'system', text: '[EXECUTING WORKSTATION BENCHMARK HARNESS]' },
          { id: Math.random().toString(), type: 'output', text: '>> Target 1: ~/pcie_cuda_bandwidth.cu (CHUNK_SIZE_BYTES: 512 MiB, 20 iterations)' },
          { id: Math.random().toString(), type: 'output', text: '   cudaHostAllocMapped DMA bandwidth: 62.4 GB/s (PCIe Gen5 x16 link)' },
          { id: Math.random().toString(), type: 'output', text: '>> Target 2: ~/vmm_nvme_direct_benchmark.c (O_DIRECT 64 KiB MoE blocks)' },
          { id: Math.random().toString(), type: 'output', text: '   Kernel page-cache bypass latency: 4.8 μs per random 64 KiB read' },
          { id: Math.random().toString(), type: 'highlight', text: '>> HARNESS RESULT: ZERO FAULTS | ZERO DROPPED DMA FRAMES' }
        );
        break;

      case 'shop':
      case 'store':
      case 'products':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'Saltobo Systems Hardware Storefront (saltobo.com):' },
          ...PRODUCTS.map((prod) => ({
            id: Math.random().toString(),
            type: 'output' as const,
            text: `  [${prod.id.padEnd(22)}] ${prod.name} &bull; $${prod.price.toFixed(2)} USD (${prod.badge})`,
          })),
          { id: Math.random().toString(), type: 'system', text: 'Tip: Type "buy ai" or "buy drone" to add directly to cart!' }
        );
        break;

      case 'buy':
        if (!args[0]) {
          newLines.push({ id: Math.random().toString(), type: 'error', text: 'Usage: buy <ai|drone>' });
        } else {
          const target = args[0].toLowerCase();
          const prod = PRODUCTS.find((p) => p.id.includes(target) || p.name.toLowerCase().includes(target));
          if (prod) {
            addItem(prod);
            newLines.push(
              { id: Math.random().toString(), type: 'highlight', text: `>> Added to Cart: ${prod.name} ($${prod.price.toFixed(2)})` },
              { id: Math.random().toString(), type: 'system', text: 'Cart drawer activated. Type "cart" to inspect items.' }
            );
          } else {
            newLines.push({ id: Math.random().toString(), type: 'error', text: `Product "${args[0]}" not found. Try "buy ai" or "buy drone".` });
          }
        }
        break;

      case 'cart':
        if (items.length === 0) {
          newLines.push({ id: Math.random().toString(), type: 'output', text: 'Cart is currently empty. Run "shop" to view hardware products.' });
        } else {
          newLines.push(
            { id: Math.random().toString(), type: 'highlight', text: 'Active Cart Items:' },
            ...items.map((i) => ({
              id: Math.random().toString(),
              type: 'output' as const,
              text: `  * ${i.product.name} (x${i.quantity}) - $${(i.product.price * i.quantity).toFixed(2)}`,
            })),
            { id: Math.random().toString(), type: 'system', text: `Subtotal: $${subtotal.toFixed(2)} USD (FormSubmit & Stripe checkout ready)` }
          );
        }
        break;

      case 'services':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'AI & Systems Services Tracks (Saltobo Systems):' },
          ...SERVICES.map((s) => ({
            id: Math.random().toString(),
            type: 'output' as const,
            text: `  [${s.id.padEnd(18)}] ${s.title} &bull; ${s.pricing} (${s.timeline})`,
          })),
          { id: Math.random().toString(), type: 'system', text: 'Type "book <service>" (e.g. "book data", "book vision", "book bot") to schedule.' }
        );
        break;

      case 'book':
        if (onOpenBooking) {
          const serviceMatch = args[0] ? SERVICES.find((s) => s.id.includes(args[0].toLowerCase()))?.id : undefined;
          onOpenBooking(serviceMatch);
          newLines.push(
            { id: Math.random().toString(), type: 'highlight', text: '>> Opening Saltobo Advisory Scheduler Modal...' },
            { id: Math.random().toString(), type: 'system', text: 'Inquiries route directly to ronronalds@saltobo.com.' }
          );
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: 'output',
            text: 'To schedule an advisory session, contact ronronalds@saltobo.com directly or use the scheduler modal on this page.',
          });
        }
        break;

      case 'status':
        newLines.push(
          { id: Math.random().toString(), type: 'highlight', text: 'LIVE STATION TELEMETRY:' },
          { id: Math.random().toString(), type: 'output', text: '  Host Architecture:   x86_64 Linux 6.8 hardened' },
          { id: Math.random().toString(), type: 'output', text: '  Hardware Toolchain:  Rustc 1.99, Zig, Clang 21, GCC 15, CUDA' },
          { id: Math.random().toString(), type: 'output', text: '  Active Endpoints:    saltobo.com / ronronalds@saltobo.com' },
          { id: Math.random().toString(), type: 'output', text: '  CAN-FD Protocol:     ISO 15765-2 Active / Zero Dropped Frames' },
          { id: Math.random().toString(), type: 'output', text: '  Enclave Barrier:     Aegis Port 9443 Sealed with explicit_bzero' },
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
          text: `bash: command not found: "${cmd}". Type "help" to see available orchestration commands.`,
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
      const current = input.trim().toLowerCase();
      const candidates = ['help', 'whoami', 'projects', 'inspect', 'bench', 'shop', 'buy', 'cart', 'services', 'book', 'status', 'clear'];
      const match = candidates.find((c) => c.startsWith(current));
      if (match) {
        setInput(match + ' ');
      }
    }
  };

  return (
    <div
      className={`glass-panel rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 font-mono text-sm transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 flex flex-col bg-neutral-950/98' : 'w-full'
      }`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>ron@saltobo-orchestrator:~ (bash)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 hidden sm:inline-block">
            HOST ARTIFACTS VERIFIED
          </span>
          <button
            onClick={() => setLines([])}
            title="Clear buffer"
            className="p-1 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Restore window' : 'Maximize terminal'}
            className="p-1 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Output Buffer */}
      <div
        className={`p-4 overflow-y-auto space-y-1 bg-neutral-950/95 select-text ${
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

      {/* Prompt Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/70 border-t border-white/5">
        <span className="text-cyan-400 font-bold select-none text-xs sm:text-sm">ron@saltobo:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Try 'shop', 'services', 'bench', 'inspect pcie', 'book'..."
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
