import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappGreeting, whatsappHref } from '../../data/brand';

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const buildWhatsAppHref = () => {
    const name = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'Customer';
    const body = [
      whatsappGreeting(),
      `My name is *${name}*.`,
      form.email ? `Email: ${form.email}` : '',
      form.phone ? `Phone: ${form.phone}` : '',
      form.message ? `Message: ${form.message}` : 'I would like to know more about your watches.',
    ]
      .filter(Boolean)
      .join('\n');
    return whatsappHref(body);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-full bg-stone-50 border border-stone-200 text-sm text-[#0D0B0A] placeholder:text-stone-400 focus:outline-none focus:border-[#AC7A37] transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm"
    >
      <div className="mb-6 text-center sm:text-left">
        <h3 className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase text-[#0D0B0A]">
          Send a Message
        </h3>
        <div className="w-16 h-0.5 bg-[#AC7A37] mx-auto sm:mx-0 mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
            First Name
          </label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={update('firstName')}
            className={inputClass}
            placeholder="First name"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={update('lastName')}
            className={inputClass}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            className={inputClass}
            placeholder="03XX XXXXXXX"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Message
        </label>
        <textarea
          rows={4}
          required
          value={form.message}
          onChange={update('message')}
          className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-[#0D0B0A] placeholder:text-stone-400 focus:outline-none focus:border-[#AC7A37] transition-colors resize-y min-h-[120px]"
          placeholder="Tell us which watch you are interested in…"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0D0B0A] text-white font-semibold uppercase tracking-wider text-xs py-3.5 rounded-full hover:bg-[#AC7A37] hover:text-[#0D0B0A] transition-colors"
        >
          <Send size={14} />
          Send Inquiry
        </button>
        <a
          href={buildWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold uppercase tracking-wider text-xs py-3.5 rounded-full hover:bg-[#1ebe57] transition-colors"
        >
          <FaWhatsapp size={16} />
          Book On WhatsApp
        </a>
      </div>

      {sent && (
        <p className="mt-4 text-xs text-[#AC7A37] font-medium flex items-center gap-1.5">
          <MessageCircle size={14} />
          Thanks — we will get back to you shortly.
        </p>
      )}
    </form>
  );
}
