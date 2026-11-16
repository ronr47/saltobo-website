export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  badge: string;
  category: 'Hardware' | 'Aerospace';
  inStock: boolean;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  stripeUrl?: string; // Ready for Stripe Payment Links
  interactiveType?: 'ai-module' | 'drone-frame';
}

export const PRODUCTS: Product[] = [
  {
    id: 'ai-accelerator-module',
    name: 'Saltobo AI Accelerator Module',
    subtitle: 'Low-power edge tensor compute in standard M.2 2280 form factor',
    price: 299.0,
    badge: 'Flagship Silicon',
    category: 'Hardware',
    inStock: true,
    description: 'High-density neural coprocessor engineered for real-time edge vision, sensor fusion, and on-device inference without thermal throttling.',
    specs: [
      { label: 'Compute Performance', value: '32 TOPS (INT8) / 16 TFLOPS' },
      { label: 'Host Interface', value: 'PCIe Gen4 x4 (M.2 Key-M)' },
      { label: 'Power Consumption', value: '12W - 35W Configurable TDP' },
      { label: 'Model Runtimes', value: 'TensorRT, ONNX, PyTorch, C++ API' },
      { label: 'Thermal Solution', value: 'Dual-Vapor Chamber CNC Heatsink' },
      { label: 'Driver Stack', value: 'Linux Kernel 5.15+ (DKMS Zero-Copy)' },
    ],
    features: [
      'Sub-millisecond inference for YOLO, MobileNet, and transformer embedding models',
      'Zero-copy DMA memory fabric directly mapping host ring buffers to tensor cores',
      'Hardware-fused image preprocessing engine eliminating CPU resizing overhead',
      'Tested with Raspberry Pi 5 CM, NVIDIA Jetson carrier boards, and x86_64 industrial nodes',
    ],
    interactiveType: 'ai-module',
    stripeUrl: 'https://buy.stripe.com/test_saltobo_ai_accelerator',
  },
  {
    id: 'fpv-drone-frame',
    name: 'Saltobo Apex 5" FPV Carbon Frame',
    subtitle: 'Resonance-dampened 3K Toray carbon chassis with titanium fasteners',
    price: 89.99,
    badge: 'Aero Engineered',
    category: 'Aerospace',
    inStock: true,
    description: 'Ultralight, rigid racing and cinematic freestyle frame designed with squashed-X geometry for razor-sharp gyroscopic response and zero camera prop view.',
    specs: [
      { label: 'Frame Geometry', value: 'Squashed-X (Zero Prop in View)' },
      { label: 'Wheelbase', value: '225 mm (5" - 5.1" Propellers)' },
      { label: 'Dry Weight', value: '78 g with Titanium Hardware' },
      { label: 'Carbon Material', value: 'Toray T700 3K Chamfered Matte' },
      { label: 'Arm Thickness', value: '5.5 mm Quick-Swap Interlocking' },
      { label: 'Mounting Patterns', value: '20x20mm & 30.5x30.5mm Dual Stack' },
    ],
    features: [
      'Engineered structural resonance above 320 Hz to bypass motor-gyro harmonic noise',
      'Precision CNC-machined 7075-T6 aluminum front camera cage with 15°-65° tilt',
      'TPU 95A molded vibration isolation arm protectors and antenna mounts included',
      'Grade 5 (Ti-6Al-4V) rainbow-anodized titanium hex hardware for extreme shear resilience',
    ],
    interactiveType: 'drone-frame',
    stripeUrl: 'https://buy.stripe.com/test_saltobo_drone_frame',
  },
];
