import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ShoppingCart, Calendar } from 'lucide-react';
import { soundFX } from './AudioEngine';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [soundEnabled, setSoundEnabled] = useState(soundFX.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = soundFX.toggle();
    setSoundEnabled(newState);
  };

  const navItems = [
    { label: 'Store', href: '#store' },
    { label: 'Services & Courses', href: '#services' },
    { label: 'Artifacts', href: '#projects' },
    { label: 'Architecture', href: '#benchmarks' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-neutral-950/85 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-neutral-950 text-xs shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors text-sm sm:text-base">
              Saltobo Systems
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              saltobo.com &bull; Ron Ronalds
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => soundFX.playClick()}
              className="hover:text-cyan-400 transition-colors text-xs font-mono uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Drawer Trigger */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsCartOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-cyan-500/40 text-neutral-200 hover:text-white transition-all cursor-pointer flex items-center gap-2 relative group"
            title="Open Equipment Cart"
          >
            <ShoppingCart className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-mono text-xs">Cart</span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-neutral-950 font-mono font-extrabold text-[11px] flex items-center justify-center shadow-md shadow-cyan-500/30">
                {totalItems}
              </span>
            )}
          </button>

          {/* SFX Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized audio feedback'}
            className={`p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer hidden sm:flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[11px]">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          {/* Book Session CTA */}
          {onOpenBooking && (
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenBooking();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white font-mono text-xs transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Book Session</span>
            </button>
          )}

          {/* Connect CTA */}
          <a
            href="#contact"
            onClick={() => soundFX.playClick()}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer hidden sm:inline-block"
          >
            Dispatch
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-neutral-950/98 border-b border-white/10 space-y-3 font-medium text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-neutral-200 hover:text-cyan-400 border-b border-white/5 font-mono text-xs uppercase"
            >
              {item.label}
            </a>
          ))}
          {onOpenBooking && (
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white font-mono text-xs font-bold"
            >
              Book an Architecture Session
            </button>
          )}
          <a
            href="#contact"
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(false);
            }}
            className="block text-center py-2.5 rounded-xl bg-cyan-500 text-neutral-950 font-bold text-xs"
          >
            Direct Dispatch
          </a>
        </div>
      )}
    </nav>
  );
};
