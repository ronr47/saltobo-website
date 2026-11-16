import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check, CreditCard } from 'lucide-react';
import { soundFX } from './AudioEngine';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [buyerInfo, setBuyerInfo] = useState({ name: '', email: '', shippingAddress: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundFX.playClick();

    const orderSummary = items
      .map((item) => `${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`)
      .join('\n');

    try {
      await fetch('https://formsubmit.co/ajax/ronronalds@saltobo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Saltobo Systems Order - ${buyerInfo.name} ($${subtotal.toFixed(2)})`,
          name: buyerInfo.name,
          email: buyerInfo.email,
          shippingAddress: buyerInfo.shippingAddress,
          orderSummary,
          totalAmount: `$${subtotal.toFixed(2)} USD`,
          notes: buyerInfo.notes || 'None',
          _template: 'table',
        }),
      });

      soundFX.playChirp(1400, 0.1);
      setCheckoutStep('success');
    } catch {
      // Fallback: mailto
      window.location.href = `mailto:ronronalds@saltobo.com?subject=${encodeURIComponent(
        'Order Request from ' + buyerInfo.name + ' - Saltobo Systems'
      )}&body=${encodeURIComponent(
        `Order Details:\n${orderSummary}\nTotal: $${subtotal.toFixed(2)}\n\nShipping Address:\n${buyerInfo.shippingAddress}\nContact: ${buyerInfo.email}`
      )}`;
      setCheckoutStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div
        className="glass-panel w-full max-w-md h-full bg-neutral-950/98 border-l border-cyan-500/30 p-6 flex flex-col justify-between shadow-2xl relative animate-slide-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Saltobo Equipment Cart</h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                setIsCartOpen(false);
              }}
              className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart View */}
          {checkoutStep === 'cart' && (
            <>
              {/* Shipping Threshold */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5 mb-5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400 mb-1.5">
                  <span>Express Global Dispatch:</span>
                  <span className="text-cyan-300 font-bold">
                    {subtotal >= 150 ? 'UNLOCKED (FREE)' : `$${(150 - subtotal).toFixed(2)} to Free`}
                  </span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-400 font-mono text-sm">Cart buffer is empty</p>
                  <p className="text-neutral-600 text-xs mt-1">Explore our hardware modules and drone frames below.</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-xs sm:text-sm truncate">{product.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          ${product.price.toFixed(2)} USD
                        </div>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-white/10 font-mono text-xs">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-white text-xs">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Checkout View */}
          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center gap-2">
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span>Invoice / Stripe Payment Dispatch &bull; Saltobo Systems</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">RECIPIENT NAME / COMPANY</label>
                <input
                  type="text"
                  required
                  value={buyerInfo.name}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                  placeholder="Ron Ronalds"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">EMAIL FOR INVOICE & TRACKING</label>
                <input
                  type="email"
                  required
                  value={buyerInfo.email}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                  placeholder="buyer@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">SHIPPING DESTINATION</label>
                <textarea
                  required
                  rows={2}
                  value={buyerInfo.shippingAddress}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, shippingAddress: e.target.value })}
                  placeholder="Street, City, State/Province, Postal Code, Country"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">SPECIAL INSTRUCTIONS (OPTIONAL)</label>
                <input
                  type="text"
                  value={buyerInfo.notes}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, notes: e.target.value })}
                  placeholder="Custom heatsink color, firmware pre-flash..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </form>
          )}

          {/* Order Success View */}
          {checkoutStep === 'success' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Order Transmission Logged</h4>
              <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                Your order specification was routed directly to <span className="text-cyan-400">ronronalds@saltobo.com</span>.
              </p>
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-left text-xs font-mono text-neutral-300 space-y-1">
                <div>Recipient: <span className="text-white font-bold">{buyerInfo.name}</span></div>
                <div>Invoice Destination: <span className="text-white">{buyerInfo.email}</span></div>
                <div>Amount: <span className="text-cyan-400 font-bold">${subtotal.toFixed(2)} USD</span></div>
              </div>
              <p className="text-[11px] text-neutral-500">
                You will receive a Stripe payment link and hardware dispatch tracking number within 12 hours.
              </p>
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  setIsCartOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-neutral-800 text-white text-xs font-mono font-bold hover:bg-neutral-700 transition-colors"
              >
                Close & Return to Station
              </button>
            </div>
          )}
        </div>

        {/* Footer / Action */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between items-center font-mono">
              <span className="text-xs text-neutral-400 uppercase">Subtotal</span>
              <span className="text-xl font-extrabold text-white">${subtotal.toFixed(2)} USD</span>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => {
                  soundFX.playClick();
                  setCheckoutStep('checkout');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <span>Proceed to Order Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 text-xs font-mono hover:text-white"
                >
                  Back
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  {isSubmitting ? <span>Transmitting...</span> : <span>Confirm & Dispatch Order</span>}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct fulfillment from Saltobo Systems (saltobo.com)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
