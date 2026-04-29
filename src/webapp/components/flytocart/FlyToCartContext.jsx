import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

// ─── Context ────────────────────────────────────────────────────────────────
const FlyToCartContext = createContext(null);

// ─── Hook ───────────────────────────────────────────────────────────────────
export const useFlyToCart = () => useContext(FlyToCartContext);

// ─── Provider ───────────────────────────────────────────────────────────────
export const FlyToCartProvider = ({ children }) => {
  const cartIconRef = useRef(null);       // ref to the cart icon DOM node in Navbar
  const [flyItem, setFlyItem] = useState(null); // { id, src, startX, startY }

  // Navbar calls this once to register where the cart icon lives
  const registerCartIcon = useCallback((el) => {
    cartIconRef.current = el;
  }, []);

  // ProductCard calls this on first add
  const triggerFly = useCallback((imageSrc, sourceElement) => {
    if (!cartIconRef.current || !sourceElement) return;

    const srcRect  = sourceElement.getBoundingClientRect();
    const destRect = cartIconRef.current.getBoundingClientRect();

    // Start position — centre of the product image
    const startX = srcRect.left + srcRect.width  / 2;
    const startY = srcRect.top  + srcRect.height / 2;

    // End position — centre of the cart icon
    const endX = destRect.left + destRect.width  / 2;
    const endY = destRect.top  + destRect.height / 2;

    setFlyItem({
      id:     Date.now(),
      src:    imageSrc,
      startX,
      startY,
      endX,
      endY,
    });
  }, []);

  const clearFlyItem = useCallback(() => setFlyItem(null), []);

  return (
    <FlyToCartContext.Provider value={{ triggerFly, registerCartIcon }}>
      {children}

      {/* ── Flying clone — rendered in a portal so it is never clipped ── */}
      {flyItem &&
        createPortal(
          <FlyingImage key={flyItem.id} item={flyItem} onDone={clearFlyItem} />,
          document.body
        )}
    </FlyToCartContext.Provider>
  );
};

// ─── FlyingImage ─────────────────────────────────────────────────────────────
// Purely visual — mounts, animates, then calls onDone to unmount itself.
const FlyingImage = ({ item, onDone }) => {
  const { startX, startY, endX, endY, src } = item;

  // Size of the flying thumbnail
  const SIZE = 64;

  // ── Arc control point — curves upward between start and end ──
  // We bias the control point above the midpoint for a natural parabola
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 120; // 120px above the higher of the two

  // Total duration
  const DURATION = 700; // ms

  // We animate via a JS requestAnimationFrame loop so we can follow
  // the bezier curve exactly — CSS alone can't do a true arc.
  const [pos, setPos]       = React.useState({ x: startX - SIZE / 2, y: startY - SIZE / 2 });
  const [scale, setScale]   = React.useState(1);
  const [opacity, setOpacity] = React.useState(1);
  const startTime = React.useRef(null);
  const rafRef    = React.useRef(null);

  React.useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const t = Math.min(elapsed / DURATION, 1); // 0 → 1

      // Ease-in-out cubic
      const ease = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Quadratic Bézier  B(t) = (1-t)²·P0 + 2(1-t)t·P1 + t²·P2
      const bx = (1 - ease) ** 2 * startX + 2 * (1 - ease) * ease * midX + ease ** 2 * endX;
      const by = (1 - ease) ** 2 * startY + 2 * (1 - ease) * ease * midY + ease ** 2 * endY;

      setPos({ x: bx - SIZE / 2, y: by - SIZE / 2 });

      // Scale 1 → 0.25 (shrinks as it reaches the cart)
      setScale(1 - ease * 0.75);

      // Fade out in last 25% of animation
      setOpacity(t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onDone();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // runs once on mount

  return (
    <div
      style={{
        position:     "fixed",
        top:          0,
        left:         0,
        width:        SIZE,
        height:       SIZE,
        borderRadius: "50%",
        overflow:     "hidden",
        pointerEvents:"none",       // never blocks clicks
        zIndex:       99999,        // above everything including MUI modals
        transform:    `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        opacity,
        boxShadow:    "0 4px 12px rgba(0,0,0,0.20)",
        border:       "2px solid #4CAF50",
        willChange:   "transform, opacity",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          display:    "block",
        }}
      />
    </div>
  );
};