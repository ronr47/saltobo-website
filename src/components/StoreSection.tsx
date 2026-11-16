import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Zap, Check, Shield, Cpu, Wind, ArrowRight } from 'lucide-react';
import { soundFX } from './AudioEngine';

export const StoreSection: React.FC = () => {
  const { addItem, setIsCartOpen } = useCart();
  const [aiPowerMode, setAiPowerMode] = useState<'eco' | 'turbo'>('turbo');
  const [droneMaterialView, setDroneMaterialView] = useState<'3k' | 'titanium'>('3k');

  const handleBuyNow = (product: Product) => {
    soundFX.playClick();
    addItem(product);
    setIsCartOpen(true);
  };

  return (
    <section id="store" className="py-24 bg-neutral-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3">
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>SALTOBO SYSTEMS HARDWARE STOREFRONT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Silicon Modules & Aerospace Hardware
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Precision-engineered hardware modules and carbon airframes built for high-throughput edge inference and aerodynamic agility.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 bg-neutral-900/80 px-4 py-2.5 rounded-xl border border-white/5 self-start md:self-auto">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Direct Manufacturer Fulfillment &bull; saltobo.com</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PRODUCT 1: AI Accelerator Module */}
          {(() => {
            const aiProd = PRODUCTS[0];
            return (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 transition-all">
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
                      {aiProd.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      IN STOCK &bull; SHIPS 24H
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{aiProd.name}</h3>
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
                      ${aiProd.price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-neutral-400">USD</span>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {aiProd.subtitle}
                  </p>

                  {/* Interactive Dynamic Profile Switcher */}
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/5 mb-6 font-mono">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Interactive Silicon Profile:</span>
                      </span>
                      <div className="flex gap-1 bg-neutral-950 p-1 rounded-lg border border-white/10 text-[11px]">
                        <button
                          onClick={() => setAiPowerMode('eco')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            aiPowerMode === 'eco'
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Eco 15W
                        </button>
                        <button
                          onClick={() => setAiPowerMode('turbo')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            aiPowerMode === 'turbo'
                              ? 'bg-cyan-500 text-neutral-950 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Turbo 35W
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">PEAK TOPS</div>
                        <div className="text-base font-bold text-white mt-0.5">
                          {aiPowerMode === 'turbo' ? '32 TOPS' : '18 TOPS'}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">YOLOv10 INFER</div>
                        <div className="text-base font-bold text-cyan-300 mt-0.5">
                          {aiPowerMode === 'turbo' ? '1.8 ms' : '3.4 ms'}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">THERMAL LOAD</div>
                        <div className="text-base font-bold text-amber-300 mt-0.5">
                          {aiPowerMode === 'turbo' ? '54 °C' : '41 °C'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Specs Table */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-6">
                    {aiProd.specs.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5">
                        <span className="text-[10px] text-neutral-500 block uppercase">{s.label}</span>
                        <span className="text-neutral-200 font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-8 text-xs text-neutral-300">
                    {aiProd.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleBuyNow(aiProd)}
                    className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Instant Order / Checkout</span>
                  </button>

                  <button
                    onClick={() => {
                      addItem(aiProd);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-cyan-400" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* PRODUCT 2: FPV Drone Frame */}
          {(() => {
            const droneProd = PRODUCTS[1];
            return (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-purple-500/40 transition-all">
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
                      {droneProd.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      IN STOCK &bull; SHIPS 24H
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{droneProd.name}</h3>
                    <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-mono">
                      ${droneProd.price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-neutral-400">USD</span>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {droneProd.subtitle}
                  </p>

                  {/* Interactive Carbon / Titanium Spec Toggle */}
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/5 mb-6 font-mono">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-purple-400" />
                        <span>Aero Material Inspection:</span>
                      </span>
                      <div className="flex gap-1 bg-neutral-950 p-1 rounded-lg border border-white/10 text-[11px]">
                        <button
                          onClick={() => setDroneMaterialView('3k')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            droneMaterialView === '3k'
                              ? 'bg-purple-500 text-neutral-950 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Toray T700
                        </button>
                        <button
                          onClick={() => setDroneMaterialView('titanium')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            droneMaterialView === 'titanium'
                              ? 'bg-purple-500 text-neutral-950 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Ti-6Al-4V
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">DRY WEIGHT</div>
                        <div className="text-base font-bold text-white mt-0.5">78 grams</div>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">ARM THICKNESS</div>
                        <div className="text-base font-bold text-purple-300 mt-0.5">5.5 mm CNC</div>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-950/80 border border-white/5">
                        <div className="text-[10px] text-neutral-400 uppercase">RESONANCE</div>
                        <div className="text-base font-bold text-emerald-300 mt-0.5">&gt; 320 Hz</div>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Specs Table */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-6">
                    {droneProd.specs.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5">
                        <span className="text-[10px] text-neutral-500 block uppercase">{s.label}</span>
                        <span className="text-neutral-200 font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-8 text-xs text-neutral-300">
                    {droneProd.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleBuyNow(droneProd)}
                    className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/25 active:scale-95 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Instant Order / Checkout</span>
                  </button>

                  <button
                    onClick={() => {
                      addItem(droneProd);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-purple-400" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
