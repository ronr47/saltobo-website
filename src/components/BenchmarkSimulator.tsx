import React, { useState } from 'react';
import { Cpu, Zap, Activity, Gauge, RefreshCw } from 'lucide-react';

interface VectorConfig {
  name: string;
  bits: number;
  opsPerCycle: number;
  multiplier: number;
}

const VECTOR_CONFIGS: VectorConfig[] = [
  { name: 'Scalar (x86_64)', bits: 64, opsPerCycle: 2, multiplier: 1.0 },
  { name: 'AVX2 (256-bit)', bits: 256, opsPerCycle: 16, multiplier: 3.8 },
  { name: 'AVX-512 (512-bit)', bits: 512, opsPerCycle: 32, multiplier: 7.4 },
  { name: 'Tensor Cores (BF16)', bits: 1024, opsPerCycle: 128, multiplier: 24.5 },
];

interface BusConfig {
  name: string;
  maxGbps: number;
  overheadUs: number;
}

const BUS_CONFIGS: BusConfig[] = [
  { name: 'PCIe Gen4 x8', maxGbps: 15.75, overheadUs: 2.8 },
  { name: 'PCIe Gen4 x16', maxGbps: 31.5, overheadUs: 1.9 },
  { name: 'PCIe Gen5 x16', maxGbps: 63.0, overheadUs: 0.94 },
  { name: 'Host Ring Buffer / Direct DMA', maxGbps: 112.0, overheadUs: 0.38 },
];

export const BenchmarkSimulator: React.FC = () => {
  const [selectedVector, setSelectedVector] = useState<number>(2); // Default AVX-512
  const [selectedBus, setSelectedBus] = useState<number>(2); // Default PCIe Gen5 x16
  const [clockGhz, setClockGhz] = useState<number>(4.8);
  const [cores, setCores] = useState<number>(16);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const vector = VECTOR_CONFIGS[selectedVector];
  const bus = BUS_CONFIGS[selectedBus];

  // Calculations
  const peakGflops = Math.round(cores * clockGhz * vector.opsPerCycle * 10) / 10;
  const effectiveBandwidth = Math.round(bus.maxGbps * 0.96 * 10) / 10;
  const dispatchLatency = (bus.overheadUs / (vector.multiplier * 0.4)).toFixed(2);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERACTIVE HARDWARE PROFILER</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Microarchitectural SIMD & DMA Roofline Engine
          </h3>
          <p className="text-neutral-400 text-sm mt-1">
            Simulate arithmetic throughput and host-to-device interconnect saturation across custom silicon configurations.
          </p>
        </div>

        <button
          onClick={runSimulation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>Profile Compute</span>
        </button>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Vector Execution Unit Selector */}
        <div className="bg-neutral-900/60 rounded-xl p-5 border border-white/5">
          <label className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Instruction Vectorization (SIMD)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {VECTOR_CONFIGS.map((cfg, idx) => (
              <button
                key={cfg.name}
                onClick={() => setSelectedVector(idx)}
                className={`p-3 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                  selectedVector === idx
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'bg-neutral-950/60 border-white/5 text-neutral-400 hover:border-white/10 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white truncate">{cfg.name}</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">{cfg.bits}-bit registers</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interconnect Bus Selector */}
        <div className="bg-neutral-900/60 rounded-xl p-5 border border-white/5">
          <label className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Interconnect & Memory Fabric</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BUS_CONFIGS.map((b, idx) => (
              <button
                key={b.name}
                onClick={() => setSelectedBus(idx)}
                className={`p-3 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                  selectedBus === idx
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-sm shadow-amber-500/20'
                    : 'bg-neutral-950/60 border-white/5 text-neutral-400 hover:border-white/10 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-white truncate">{b.name}</div>
                <div className="text-[11px] text-neutral-400 mt-1 font-mono">{b.maxGbps} GB/s peak</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sliders for Clock & Cores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-900/40 p-5 rounded-xl border border-white/5 mb-8">
        <div>
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
            <span>Target Core Clock</span>
            <span className="text-cyan-400 font-bold">{clockGhz.toFixed(1)} GHz</span>
          </div>
          <input
            type="range"
            min="2.0"
            max="6.0"
            step="0.1"
            value={clockGhz}
            onChange={(e) => setClockGhz(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
            <span>Active Physical SMT Cores</span>
            <span className="text-purple-400 font-bold">{cores} Cores</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            step="4"
            value={cores}
            onChange={(e) => setCores(parseInt(e.target.value))}
            className="w-full accent-purple-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Live Calculated Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-neutral-950/80 rounded-xl p-5 border border-cyan-500/20 relative overflow-hidden">
          <div className="text-xs font-mono text-cyan-400/80 flex items-center justify-between mb-2">
            <span>THEORETICAL COMPUTE</span>
            <Gauge className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {peakGflops.toLocaleString()} <span className="text-sm font-normal text-neutral-400">GFLOPS</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (peakGflops / 50000) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 font-mono">
            {cores} cores × {vector.opsPerCycle} ops/cyc × {clockGhz}GHz
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-neutral-950/80 rounded-xl p-5 border border-amber-500/20 relative overflow-hidden">
          <div className="text-xs font-mono text-amber-400/80 flex items-center justify-between mb-2">
            <span>SUSTAINED DMA BANDWIDTH</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {effectiveBandwidth} <span className="text-sm font-normal text-neutral-400">GB/s</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (effectiveBandwidth / 120) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 font-mono">
            96% link efficiency with pinned pages
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-neutral-950/80 rounded-xl p-5 border border-purple-500/20 relative overflow-hidden">
          <div className="text-xs font-mono text-purple-400/80 flex items-center justify-between mb-2">
            <span>KERNEL DISPATCH OVERHEAD</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {dispatchLatency} <span className="text-sm font-normal text-neutral-400">μs</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, Math.min(100, (parseFloat(dispatchLatency) / 3.0) * 100))}%` }}
            />
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 font-mono">
            Zero-copy ring buffer arbitration
          </p>
        </div>
      </div>
    </div>
  );
};
