import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Sparkles } from "lucide-react";

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const scratchDistance = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const paintHeart = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const width = bounds.width;
      const height = bounds.height;
      const heart = new Path2D();
      heart.moveTo(width * 0.5, height * 0.88);
      heart.bezierCurveTo(width * 0.39, height * 0.79, width * 0.12, height * 0.59, width * 0.12, height * 0.37);
      heart.bezierCurveTo(width * 0.12, height * 0.17, width * 0.37, height * 0.1, width * 0.5, height * 0.29);
      heart.bezierCurveTo(width * 0.63, height * 0.1, width * 0.88, height * 0.17, width * 0.88, height * 0.37);
      heart.bezierCurveTo(width * 0.88, height * 0.59, width * 0.61, height * 0.79, width * 0.5, height * 0.88);
      heart.closePath();
      const gradient = context.createLinearGradient(width * 0.12, height * 0.2, width * 0.82, height * 0.85);
      gradient.addColorStop(0, "#b8c5b2");
      gradient.addColorStop(0.48, "#80977f");
      gradient.addColorStop(1, "#24493c");
      context.save();
      context.shadowColor = "rgba(25, 54, 43, 0.22)";
      context.shadowBlur = 17;
      context.fillStyle = gradient;
      context.fill(heart);
      context.restore();
      context.save();
      context.clip(heart);
      let seed = 37;
      for (let index = 0; index < 130; index += 1) {
        seed = (seed * 16807) % 2147483647;
        const x = ((seed % 1000) / 1000) * width;
        seed = (seed * 16807) % 2147483647;
        const y = ((seed % 1000) / 1000) * height;
        seed = (seed * 16807) % 2147483647;
        const radius = 0.35 + ((seed % 100) / 100) * 1.15;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 250, 226, ${0.18 + ((seed % 50) / 100)})`;
        context.fill();
      }
      context.restore();
    };
    paintHeart();
    window.addEventListener("resize", paintHeart);
    return () => window.removeEventListener("resize", paintHeart);
  }, []);

  const revealAll = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    setRevealed(true);
  };

  const startScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    isScratching.current = true;
    lastPoint.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratch(event);
  };

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching.current || revealed) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 36;
    if (lastPoint.current) {
      context.beginPath();
      context.moveTo(lastPoint.current.x, lastPoint.current.y);
      context.lineTo(point.x, point.y);
      context.stroke();
      scratchDistance.current += Math.hypot(point.x - lastPoint.current.x, point.y - lastPoint.current.y);
    }
    context.beginPath();
    context.arc(point.x, point.y, 18, 0, Math.PI * 2);
    context.fill();
    context.restore();
    lastPoint.current = point;
    if (scratchDistance.current > 360) revealAll();
  };

  const stopScratch = () => {
    isScratching.current = false;
    lastPoint.current = null;
  };

  return (
    <div className={`scratch-module${revealed ? " is-revealed" : ""}`}>
      <div className="scratch-heading">
        <Sparkles size={16} strokeWidth={1.4} aria-hidden="true" />
        <span>{revealed ? "A date to hold close" : "Scratch to reveal"}</span>
        <Sparkles size={16} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <div className="scratch-heart-wrap">
        <div className="date-under-heart" aria-live="polite">
          <span className="date-under-label">Monday</span>
          <strong>November 30</strong>
          <span>2026 · 10:30 AM</span>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onPointerDown={startScratch}
          onPointerMove={scratch}
          onPointerUp={stopScratch}
          onPointerCancel={stopScratch}
          onPointerLeave={stopScratch}
          aria-label="Scratch the heart to reveal the wedding date"
          role="img"
        />
      </div>
      <p className="scratch-help">Gently rub the heart with your finger</p>
      {!revealed && <button className="text-button reveal-button" type="button" onClick={revealAll}>Reveal the date <span aria-hidden="true">↗</span></button>}
      {revealed && <a className="save-date-button" href="#countdown">The date is yours <span aria-hidden="true">♡</span></a>}
    </div>
  );
}
