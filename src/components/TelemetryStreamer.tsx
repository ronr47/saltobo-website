import React, { useState, useEffect } from 'react';
import { Radio, Play, Pause, Activity } from 'lucide-react';

interface CanFrame {
  id: string;
  arbId: string;
  dlc: number;
  data: string;
  name: string;
  timestamp: string;
}

export const TelemetryStreamer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [frames, setFrames] = useState<CanFrame[]>([]);
  const [metrics, setMetrics] = useState({
    rpm: 2420,
    speed: 78,
    boostPsi: 18.4,
    transTemp: 84,
    batteryV: 14.2,
  });

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      // Random variations
      const newRpm = Math.floor(2200 + Math.sin(Date.now() / 2000) * 800 + Math.random() * 50);
      const newSpeed = Math.floor(70 + Math.sin(Date.now() / 4000) * 15);
      const newBoost = +(16 + Math.sin(Date.now() / 1500) * 4).toFixed(1);
      const newTemp = +(83 + Math.sin(Date.now() / 8000) * 2).toFixed(1);

      setMetrics({
        rpm: newRpm,
        speed: newSpeed,
        boostPsi: newBoost,
        transTemp: newTemp,
        batteryV: 14.2,
      });

      const sampleFrames = [
        {
          arbId: '0x1F9',
          name: 'ECM_ENGINE_RPM',
          data: `${(newRpm >> 8).toString(16).padStart(2, '0').toUpperCase()} ${(newRpm & 0xff).toString(16).padStart(2, '0').toUpperCase()} 34 A0 00 12 FF 20`,
        },
        {
          arbId: '0x2A0',
          name: 'TCM_TRANSMISSION',
          data: `04 88 ${(newSpeed * 2).toString(16).padStart(2, '0').toUpperCase()} 10 54 00 00 AA`,
        },
        {
          arbId: '0x5C2',
          name: 'ISO15765_UDS_RESP',
          data: `06 62 01 00 ${(newBoost * 10).toString(16).padStart(2, '0').toUpperCase()} 44 00 00`,
        },
      ];

      const chosen = sampleFrames[Math.floor(Math.random() * sampleFrames.length)];
      const frame: CanFrame = {
        id: Math.random().toString(),
        arbId: chosen.arbId,
        dlc: 8,
        data: chosen.data,
        name: chosen.name,
        timestamp: timeStr,
      };

      setFrames((prev) => [frame, ...prev.slice(0, 7)]);
    }, 280);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SOCKETCAN / UDS CAPTURE GATEWAY</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Real-Time Vehicle Bus Telemetry Stream
          </h3>
          <p className="text-neutral-400 text-sm mt-1">
            Live ISO-TP framing and CAN 2.0B / CAN-FD packet arbitration gateway.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
            isPlaying
              ? 'bg-neutral-900 border-white/20 text-neutral-300 hover:border-white/30'
              : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'PAUSE BUS' : 'RESUME STREAM'}</span>
        </button>
      </div>

      {/* Real-time Telemetry Dashboard Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono">
        <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-neutral-400 uppercase">ENGINE SPEED</div>
          <div className="text-xl font-bold text-cyan-300 mt-1">{metrics.rpm} <span className="text-xs text-neutral-500">RPM</span></div>
        </div>

        <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-neutral-400 uppercase">WHEEL VELOCITY</div>
          <div className="text-xl font-bold text-purple-300 mt-1">{metrics.speed} <span className="text-xs text-neutral-500">KM/H</span></div>
        </div>

        <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-neutral-400 uppercase">TURBO MANIFOLD</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{metrics.boostPsi} <span className="text-xs text-neutral-500">PSI</span></div>
        </div>

        <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-neutral-400 uppercase">ATF TEMPERATURE</div>
          <div className="text-xl font-bold text-emerald-300 mt-1">{metrics.transTemp} <span className="text-xs text-neutral-500">°C</span></div>
        </div>
      </div>

      {/* Packet Stream Console */}
      <div className="bg-neutral-950 rounded-xl border border-white/10 p-4 font-mono text-xs overflow-x-auto">
        <div className="grid grid-cols-12 text-[10px] text-neutral-400 border-b border-white/10 pb-2 mb-2 uppercase tracking-wider font-semibold">
          <div className="col-span-3 sm:col-span-2">TIMESTAMP</div>
          <div className="col-span-2 sm:col-span-2">ARB ID</div>
          <div className="col-span-3 sm:col-span-3">SIGNAL NAME</div>
          <div className="col-span-4 sm:col-span-5 text-right sm:text-left">HEX DATA PAYLOAD</div>
        </div>

        <div className="space-y-1.5">
          {frames.map((frame) => (
            <div key={frame.id} className="grid grid-cols-12 text-neutral-300 py-1 hover:bg-white/5 rounded px-1 transition-colors">
              <div className="col-span-3 sm:col-span-2 text-neutral-500 truncate">{frame.timestamp}</div>
              <div className="col-span-2 sm:col-span-2 text-amber-400 font-bold">{frame.arbId}</div>
              <div className="col-span-3 sm:col-span-3 text-cyan-300 truncate">{frame.name}</div>
              <div className="col-span-4 sm:col-span-5 font-mono text-neutral-400 text-right sm:text-left truncate">
                {frame.data}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAN0 INTERFACE: UP, 1000000 bps, FD SUPPORTED</span>
        </div>
        <span>0 PACKETS DROPPED</span>
      </div>
    </div>
  );
};
