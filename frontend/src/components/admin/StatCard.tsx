import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: 'gold' | 'dark' | 'green' | 'blue';
}

const TONES = {
  gold: 'bg-[#AC7A37]/10 text-[#AC7A37]',
  dark: 'bg-stone-900/5 text-[#0D0B0A]',
  green: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-sky-50 text-sky-700',
};

function StatCard({ title, value, hint, icon: Icon, tone = 'gold' }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
            {title}
          </p>
          <p className="mt-2 text-2xl font-black text-[#0D0B0A] tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
        </div>
        <div className={`size-11 rounded-xl flex items-center justify-center ${TONES[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
