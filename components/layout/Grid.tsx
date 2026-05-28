type GridProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Grid({
  children,
  className = "",
}: GridProps) {
  return (
    <div
      className={`
        grid
        grid-cols-2
        gap-x-[20px]
        md:grid-cols-12
        md:gap-x-[20px]
        ${className}
      `}
    >
      {children}
    </div>
  );
}