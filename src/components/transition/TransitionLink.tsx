import { useTransition } from "../../context/TransitionContext";

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export default function TransitionLink({ to, children, className, "aria-label": ariaLabel }: TransitionLinkProps) {
  const { navigateTo } = useTransition();

  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        navigateTo(to);
      }}
    >
      {children}
    </a>
  );
}
