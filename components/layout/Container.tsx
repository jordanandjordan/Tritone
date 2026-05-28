type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        mx-auto
        w-full
        px-[30px]
        md:px-[60px]
        ${className}
      `}
    >
      {children}
    </div>
  );
}