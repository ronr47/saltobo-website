export interface Project {
  id: string;
  title: string;
  category: 'systems' | 'ai' | 'hardware' | 'web';
  status: 'Gold Master' | 'Production' | 'Active Research' | 'Deployed';
  tagline: string;
  description: string;
  longDescription: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  links?: { label: string; url: string }[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'linum-hybrid',
    title: 'Linum AI & Omniforge Engine',
    category: 'ai',
    status: 'Gold Master',
    tagline: 'Low-latency hybrid execution runtime with quantum gate discovery and unified memory fabric.',
    description: 'Autonomous AI synthesis runtime optimizing inference execution paths across heterogenous silicon and vector accelerators.',
    longDescription: 'The Linum Omniforge architecture combines symbolic graph decomposition with direct JIT emission for ultra-low latency inference. Built to achieve deterministic execution bounds across local compute accelerators.',
    metrics: [
      { label: 'Latency P99', value: '1.14 μs' },
      { label: 'Memory Overhead', value: '0-Copy' },
      { label: 'Throughput', value: '142k ops/s' },
    ],
    technologies: ['C99', 'Zig', 'x86_64 ASM', 'AVX-512', 'CUDA', 'Python'],
    highlights: [
      'Native substrate bridge for direct hardware acceleration without OS context switch penalties',
      'Quantum gate discovery module for topological graph optimization',
      'Continuous forensic trace logging and invariant verification harness',
    ],
  },
  {
    id: 'r2-compiler',
    title: 'R2 / r2c Native Toolchain & Substrate',
    category: 'systems',
    status: 'Gold Master',
    tagline: 'Lightweight systems compiler, substrate bridge, and zero-overhead execution environment.',
    description: 'High-performance compiler pipeline emitting compact standalone ELF and PE binaries with direct microarchitectural optimization.',
    longDescription: 'R2 is a specialized systems toolchain providing deterministic memory layout, custom bytecode virtualization, and a unified runtime bridge connecting user-space applications directly with hardware arbiter primitives.',
    metrics: [
      { label: 'Binary Footprint', value: '< 24 KB' },
      { label: 'Bootstrap Time', value: '0.4 ms' },
      { label: 'Code Density', value: '+38% vs GCC -Os' },
    ],
    technologies: ['C99', 'Zig', 'LLVM IR', 'ELF Format', 'Bare Metal'],
    highlights: [
      'Self-contained runtime requiring zero dynamic runtime dependencies (no libc mandatory)',
      'Dual-bank state arbiter preventing binary corruption across live updates',
      'Integrated forensic disassembly and PE/ELF integrity auditing',
    ],
  },
  {
    id: 'aegis-enclave',
    title: 'Aegis Enclave & Firmware Substrate',
    category: 'systems',
    status: 'Production',
    tagline: 'Hardened bare-metal firmware stub, isolated execution enclave, and cryptographic seal.',
    description: 'Hardware-enforced execution isolation environment designed for zero-trust runtime execution and tamper-proof telemetry validation.',
    longDescription: 'Implements custom UEFI boot payloads, hardware-root-of-trust verification, and memory segmentation barriers to prevent cold-boot attacks and hypervisor inspection.',
    metrics: [
      { label: 'Boot Hook Overhead', value: '1.8 ms' },
      { label: 'Cryptographic Attest', value: 'SHA-256 + Dilithium' },
      { label: 'Fault Recovery', value: 'Dual-Bank Atomic' },
    ],
    technologies: ['UEFI Specification', 'C99', 'x86_64 Assembly', 'ACPI Tables', 'Firmware'],
    highlights: [
      'Custom BOOTX64.EFI payload with direct framebuffer rendering and IDT hooking',
      'Dual-bank firmware state machine ensuring zero unbootable states during flashes',
      'Microarchitectural side-channel mitigation and memory page scrubbers',
    ],
  },
  {
    id: 'vehicle-telemetry',
    title: 'Automotive CAN Bus & UDS Diagnostic Fabric',
    category: 'hardware',
    status: 'Production',
    tagline: 'Real-time ISO-TP transport layer framing and unified diagnostic service gateway.',
    description: 'High-throughput CAN bus telemetry capture, frame reassembly, and live automotive diagnostic orchestration suite.',
    longDescription: 'Handles high-frequency CAN 2.0B / CAN-FD frames, multi-frame ISO 15765-2 flow control, and ISO 14229 Unified Diagnostic Services for real-time vehicular parameter monitoring and telematics streaming.',
    metrics: [
      { label: 'Frame Jitter', value: '< 40 μs' },
      { label: 'Bus Load Handling', value: '100% at 1 Mbps' },
      { label: 'Buffer Loss', value: '0 Frames' },
    ],
    technologies: ['Kotlin', 'Rust', 'CAN 2.0B', 'ISO-TP', 'UDS (ISO 14229)', 'SocketCAN'],
    highlights: [
      'Strict multi-frame flow-control and sequence tracking with auto-recovery',
      'Real-time streaming gateway bridging vehicle transport to WebSocket / IPC consumers',
      'Tested across Nissan Navara D23 powertrain, BCM, and chassis ECUs',
    ],
  },
  {
    id: 'pcie-dma-streamer',
    title: 'PCIe Double-Buffering CUDA Streamer',
    category: 'ai',
    status: 'Active Research',
    tagline: 'Asynchronous pinned host-to-device memory pipeline saturating Gen5 PCIe bandwidth.',
    description: 'Microbenchmark and production streaming harness overlapping kernel computation with bidirectional DMA transfers via CUDA streams.',
    longDescription: 'Eliminates PCIe host-device bottlenecks by interleaving asynchronous CUDA memcpy engines with compute kernels using pinned ring-buffer memory topologies.',
    metrics: [
      { label: 'PCIe Saturation', value: '98.4% Theoretical' },
      { label: 'Transfer Overlap', value: '100% Concurrency' },
      { label: 'Host CPU Utilization', value: '< 2.5%' },
    ],
    technologies: ['CUDA C++', 'PCIe Gen5', 'SIMD AVX-512', 'Linux VMM', 'NVMe Direct'],
    highlights: [
      'Multi-stream ring-buffer topology eliminating host-device synchronization stalls',
      'Integrated Roofline performance model verification and hardware telemetry',
      'Direct IO and VMM page-fault benchmark harness',
    ],
  },
  {
    id: 'saltline-platform',
    title: 'Saltline & Modern Distributed Web',
    category: 'web',
    status: 'Deployed',
    tagline: 'Modern full-stack web platform with reactive micro-frontends and fluid glass UI.',
    description: 'Next-generation web applications powered by React 19, Next.js, and server-side streaming architectures.',
    longDescription: 'High-performance web platforms engineered with accessibility-first standards, fluid layout transitions, and instant edge response times.',
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Bundle Size', value: 'Minimal / Tree-shaken' },
    ],
    technologies: ['TypeScript', 'Next.js', 'React 19', 'Tailwind CSS', 'WebSockets', 'Turbopack'],
    highlights: [
      'Sub-millisecond edge response with optimized Largest Contentful Paint (LCP)',
      'Responsive design adapting from mobile displays to ultra-wide displays',
      'Type-safe end-to-end communication and live WebSocket sync',
    ],
  },
];
