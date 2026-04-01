import { forwardRef } from "react";
import { useTransition } from "../../context/TransitionContext";

interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ to, children, className, "aria-label": ariaLabel }, ref) => {
    const { navigateTo } = useTransition();

    return (
      <a
        href={to}
        ref={ref}
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
);

TransitionLink.displayName = "TransitionLink";
export default TransitionLink;
