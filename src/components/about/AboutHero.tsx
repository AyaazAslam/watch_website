export default function AboutHero() {
  return (
    <div className="relative h-[50vh] bg-[#262626] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop" 
          alt="Watch maker working" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">
          Our <span className="text-[#D6B16A]">Heritage</span>
        </h1>
        <div className="w-16 h-1 bg-[#D6B16A] mx-auto rounded-full"></div>
      </div>
    </div>
  );
}
