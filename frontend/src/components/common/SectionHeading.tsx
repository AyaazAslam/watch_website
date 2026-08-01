interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Use on dark backgrounds */
  light?: boolean;
  as?: 'h1' | 'h2';
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  light = false,
  as = 'h2',
  className = '',
}: SectionHeadingProps) => {
  const Tag = as;

  return (
    <div className={`text-center mb-8 md:mb-12 ${className}`}>
      <Tag
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.2em] uppercase break-words px-1 ${
          light ? 'text-stone-100' : 'text-[#0D0B0A]'
        }`}
      >
        {title}
      </Tag>
      <div className="w-16 h-0.5 bg-[#AC7A37] mx-auto mt-4 rounded-full" />
      {subtitle && (
        <p
          className={`text-xs md:text-sm mt-3 font-medium tracking-wide ${
            light ? 'text-stone-400' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
