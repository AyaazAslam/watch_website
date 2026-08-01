import { Link } from 'react-router-dom';
import { BRAND } from '../../data/brand';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const words = title.trim().split(' ');
  const first = words[0];
  const rest = words.slice(1).join(' ');

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f8f9fb] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-5">
            <img
              src="/img/logo.png"
              alt={BRAND.name}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.16em] text-[#0D0B0A]">
            <span className="text-[#AC7A37]">{first}</span>
            {rest ? ` ${rest}` : ''}
          </h1>
          <div className="w-14 h-0.5 bg-[#AC7A37] mx-auto mt-3 rounded-full" />
          <p className="text-sm text-stone-500 mt-3 tracking-wide">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-sm text-stone-600">{footer}</div>
        )}
      </div>
    </div>
  );
}

export default AuthShell;
