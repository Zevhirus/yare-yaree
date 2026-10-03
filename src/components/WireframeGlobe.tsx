import { useEffect, useRef } from 'react';

interface WireframeGlobeProps {
  size?: number;
  className?: string;
}

export function WireframeGlobe({ size = 480, className = '' }: WireframeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationY = 0;
    let rotationX = 0.28; // gentle tilt

    const radius = size * 0.42;
    const latLines = 14;
    const lonLines = 18;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Subtle outer glow halo
      const radialGradient = ctx.createRadialGradient(0, 0, radius * 0.7, 0, 0, radius * 1.08);
      radialGradient.addColorStop(0, 'rgba(0, 85, 164, 0.08)');
      radialGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.08, 0, Math.PI * 2);
      ctx.fill();

      // Draw latitude circles
      for (let i = 1; i < latLines; i++) {
        const phi = (Math.PI / latLines) * i - Math.PI / 2;
        const rLat = radius * Math.cos(phi);
        const yLat = radius * Math.sin(phi);

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 60; j++) {
          const theta = (j / 60) * Math.PI * 2 + rotationY;
          const x = rLat * Math.sin(theta);
          const z = rLat * Math.cos(theta);

          // Rotate around X axis
          const yRot = yLat * Math.cos(rotationX) - z * Math.sin(rotationX);
          const zRot = yLat * Math.sin(rotationX) + z * Math.cos(rotationX);

          // Perspective factor
          const p = 1 / (1 - zRot / (radius * 4.5));
          const sx = x * p;
          const sy = yRot * p;

          // Depth-based opacity (back lines faint, front lines clearer)
          if (first) {
            ctx.moveTo(sx, sy);
            first = false;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.strokeStyle = 'rgba(0, 85, 164, 0.32)';
        ctx.lineWidth = 0.95;
        ctx.stroke();
      }

      // Draw longitude circles
      for (let i = 0; i < lonLines; i++) {
        const thetaBase = (i / lonLines) * Math.PI * 2 + rotationY;

        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= 60; j++) {
          const phi = (j / 60) * Math.PI * 2;
          const x = radius * Math.cos(phi) * Math.sin(thetaBase);
          const y = radius * Math.sin(phi);
          const z = radius * Math.cos(phi) * Math.cos(thetaBase);

          // Rotate around X axis
          const yRot = y * Math.cos(rotationX) - z * Math.sin(rotationX);
          const zRot = y * Math.sin(rotationX) + z * Math.cos(rotationX);

          const p = 1 / (1 - zRot / (radius * 4.5));
          const sx = x * p;
          const sy = yRot * p;

          if (first) {
            ctx.moveTo(sx, sy);
            first = false;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.strokeStyle = 'rgba(0, 119, 182, 0.28)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Outer equator ring
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 51, 102, 0.55)';
      ctx.lineWidth = 1.15;
      ctx.stroke();

      ctx.restore();

      rotationY += 0.0035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full max-w-[480px] max-h-[480px] opacity-75"
        aria-hidden="true"
      />
    </div>
  );
}
