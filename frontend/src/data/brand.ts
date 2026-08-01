/** Store brand + contact — single source of truth for the storefront. */
export const BRAND = {
  name: 'Watch World by Azdadkhan',
  shortName: 'Watch World',
  email: 'Azdadkhan5@gmail.com',
  phoneDisplay: '0328 8819985',
  phoneTel: '+923288819985',
  whatsapp: '923288819985',
  addressLine: 'Bolton Market, M.A Jinnah Road',
  city: 'Karachi, Pakistan',
  addressFull: 'Bolton Market, M.A Jinnah Road, Karachi, Pakistan',
} as const;

export function mailtoHref(email = BRAND.email) {
  return `mailto:${email}`;
}

export function telHref(phone = BRAND.phoneTel) {
  return `tel:${phone}`;
}

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${BRAND.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function whatsappGreeting(extra?: string) {
  const intro = `Hello ${BRAND.name}!`;
  return extra ? `${intro} ${extra}` : intro;
}
