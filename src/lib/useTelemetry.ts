import { useEffect, useState } from "react";

export interface NodeTelemetry {
  node: string;
  status: "ONLINE" | "OFFLINE";
  timestamp_ms: number;
  daemon_ticks: number;
  uptime_secs: number;
  load_avg: [number, number, number];
  memory_kb: {
    total: number;
    available: number;
  };
}

const OFFLINE_SNAPSHOT: NodeTelemetry = {
  node: "Dellamarie",
  status: "OFFLINE",
  timestamp_ms: 0,
  daemon_ticks: 0,
  uptime_secs: 0,
  load_avg: [0, 0, 0],
  memory_kb: { total: 0, available: 0 },
};

const TELEMETRY_URL =
  (import.meta as { env?: { VITE_TELEMETRY_URL?: string } }).env?.VITE_TELEMETRY_URL || "https://telemetry.saltobo.com/telemetry";

export function useTelemetry(pollIntervalMs = 5000): NodeTelemetry {
  const [telemetry, setTelemetry] = useState<NodeTelemetry>(OFFLINE_SNAPSHOT);

  useEffect(() => {
    let active = true;

    async function poll() {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2500);
      try {
        const res = await fetch(TELEMETRY_URL, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active && data && data.status === "ONLINE") {
          setTelemetry({
            node: String(data.node ?? "Dellamarie"),
            status: "ONLINE",
            timestamp_ms: Number(data.timestamp_ms ?? Date.now()),
            daemon_ticks: Number(data.daemon_ticks ?? 0),
            uptime_secs: Number(data.uptime_secs ?? 0),
            load_avg: Array.isArray(data.load_avg) && data.load_avg.length === 3
              ? [Number(data.load_avg[0]), Number(data.load_avg[1]), Number(data.load_avg[2])]
              : [0, 0, 0],
            memory_kb: {
              total: Number(data.memory_kb?.total ?? 0),
              available: Number(data.memory_kb?.available ?? 0),
            },
          });
        } else if (active) {
          setTelemetry(OFFLINE_SNAPSHOT);
        }
      } catch {
        if (active) {
          setTelemetry(OFFLINE_SNAPSHOT);
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    poll();
    const id = window.setInterval(poll, pollIntervalMs);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [pollIntervalMs]);

  return telemetry;
}
