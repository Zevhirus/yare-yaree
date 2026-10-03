export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Precision background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Very faint soft ambient navy-blue and deep ocean glows */}
      <div 
        className="absolute -top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.09] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0055A4 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[45%] left-[-15%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0077B6 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.09] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #003366 0%, transparent 70%)' }}
      />

      {/* Precision editorial crosshairs */}
      <div className="absolute top-24 left-8 text-black/15 font-mono text-[10px] select-none hidden lg:block">
        +
      </div>
      <div className="absolute top-24 right-8 text-black/15 font-mono text-[10px] select-none hidden lg:block">
        +
      </div>
      <div className="absolute bottom-16 left-8 text-black/15 font-mono text-[10px] select-none hidden lg:block">
        +
      </div>
      <div className="absolute bottom-16 right-8 text-black/15 font-mono text-[10px] select-none hidden lg:block">
        +
      </div>
    </div>
  );
}
