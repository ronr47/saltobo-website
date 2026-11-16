import { useTelemetry } from "../lib/useTelemetry";

function formatUptime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}h ${m}m`;
}

export function LiveTelemetryBanner() {
  const t = useTelemetry(5000);
  const online = t.status === "ONLINE";
  const usedGiB = online
    ? ((t.memory_kb.total - t.memory_kb.available) / 1048576).toFixed(1)
    : "--";
  const totalGiB = online
    ? (t.memory_kb.total / 1048576).toFixed(1)
    : "--";

  return (
    <div
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "12px",
        letterSpacing: "0.04em",
        padding: "8px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        background: "#090b0e",
        color: "#cbd5e1",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "9999px",
            backgroundColor: online ? "#22c55e" : "#ef4444",
            display: "inline-block",
          }}
        />
        <strong>NODE: {t.node.toUpperCase()}</strong>
        <span style={{ color: online ? "#4ade80" : "#f87171" }}>
          [{t.status}]
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", color: "#94a3b8" }}>
        <span>
          LOAD: {online ? `${t.load_avg[0].toFixed(2)} / ${t.load_avg[1].toFixed(2)} / ${t.load_avg[2].toFixed(2)}` : "--"}
        </span>
        <span>
          MEM: {online ? `${usedGiB} / ${totalGiB} GiB` : "--"}
        </span>
        <span>
          UPTIME: {online ? formatUptime(t.uptime_secs) : "--"}
        </span>
        <span>
          RING TICKS: {online ? t.daemon_ticks.toLocaleString() : "0"}
        </span>
      </div>
    </div>
  );
}
