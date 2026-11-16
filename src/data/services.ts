export interface ServiceOffering {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  iconType: 'data' | 'bot' | 'vision' | 'course';
  pricing: string;
  timeline: string;
  overview: string;
  deliverables: string[];
  techStack: string[];
}

export const SERVICES: ServiceOffering[] = [
  {
    id: 'data-whispering',
    title: 'Data Whispering & Telemetry',
    tagline: 'High-frequency bus capture, packet reassembly, and zero-copy time-series pipelines.',
    badge: 'Pipelines & Telemetry',
    iconType: 'data',
    pricing: '$180 / hr or Fixed Scope',
    timeline: '1 - 3 Weeks',
    overview: 'Unlock buried sensor signals and eliminate packet loss. We architect deterministic capture pipelines for automotive CAN-FD, industrial telemetry, and high-throughput IoT fleets.',
    deliverables: [
      'Custom ISO-TP / UDS automotive diagnostic gateways with zero dropped frames',
      'eBPF and SocketCAN kernel-level filters routing packets straight to ring buffers',
      'Sub-millisecond WebSocket streaming to real-time telemetry dashboards',
      'Historical time-series storage architecture with 10x compression ratios',
    ],
    techStack: ['CAN-FD', 'ISO-TP', 'SocketCAN', 'eBPF', 'Rust', 'Kotlin', 'TimescaleDB'],
  },
  {
    id: 'chatbot-setup',
    title: 'Autonomous Chatbots & Local LLMs',
    tagline: 'Private, air-gapped on-premise AI agents and automated reasoning workflows.',
    badge: 'Autonomous AI',
    iconType: 'bot',
    pricing: 'From $1,500 Deployment',
    timeline: '3 - 7 Days',
    overview: 'Deploy domain-specific AI copilots running on your own hardware or secure cloud enclaves. Complete data privacy with zero third-party training leakage.',
    deliverables: [
      'Local Ollama / vLLM / TensorRT-LLM cluster deployment on your workstation or server',
      'Retrieval-Augmented Generation (RAG) wired to your private documentation and codebases',
      'Autonomous function calling and bash/terminal tool execution harnesses',
      'Cross-platform chat interface and CLI assistant for your engineering team',
    ],
    techStack: ['Ollama', 'vLLM', 'Gemini API', 'LangChain', 'Python', 'TypeScript', 'Vector DBs'],
  },
  {
    id: 'vision-boost',
    title: 'Vision Boost & Edge Inference',
    tagline: 'Sub-millisecond computer vision pipelines accelerated on custom silicon.',
    badge: 'Silicon Acceleration',
    iconType: 'vision',
    pricing: 'From $2,200 / Pipeline',
    timeline: '2 - 4 Weeks',
    overview: 'Transform sluggish deep learning models into blisteringly fast edge vision systems. We optimize models for NVIDIA Jetson, Intel Lunar Lake, and edge NPUs.',
    deliverables: [
      'Model quantization (FP32 → FP16 → INT8) with minimal accuracy degradation',
      'TensorRT and OpenVINO hardware-accelerated execution pipelines',
      'Direct MIPI CSI-2 & USB3 Vision camera driver integration with zero-copy frames',
      'Real-time object detection (YOLO/RT-DETR) sustained at 60+ FPS',
    ],
    techStack: ['TensorRT', 'CUDA', 'OpenCV', 'YOLOv10', 'PyTorch', 'ONNX Runtime', 'C++20'],
  },
  {
    id: 'workshops-courses',
    title: 'Architecture Courses & Masterclasses',
    tagline: 'Direct engineering mentoring on low-level systems, firmware, and SIMD vectorization.',
    badge: 'Education & Mentoring',
    iconType: 'course',
    pricing: '$450 / Seat or Cohort Rate',
    timeline: 'Custom Intensive',
    overview: 'Hands-on architectural masterclasses led by Ron Ronalds. Master bare-metal UEFI execution, AVX-512 vectorization, and modern distributed web platforms.',
    deliverables: [
      'Modular curriculum with real-world low-level code repositories and lab exercises',
      'Roofline performance modeling, cache hierarchy tuning, and DMA streaming deep-dives',
      'Live code reviews and microarchitectural debugging walkthroughs',
      'Lifetime access to course artifacts, lecture notes, and private developer community',
    ],
    techStack: ['C99', 'x86_64 ASM', 'AVX-512', 'UEFI', 'Zig', 'React 19', 'Performance Profiling'],
  },
];
