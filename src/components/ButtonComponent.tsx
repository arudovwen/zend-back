import React, { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { BiLoaderAlt } from "react-icons/bi";

// Define the prop types
// @ts-ignore
interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
}

// Use forwardRef to forward the ref to the button element
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  ({ type = "submit", className = "", isLoading, children, disabled, onClick, ...rest }, ref) => {
    const merged = clsx("btn", className);

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled || isLoading}
        type={type}
        className={merged}
        {...rest}
      >
        {children}
        {isLoading && (
          <span>
            <BiLoaderAlt data-testid="loader" className="animate-spin" />
          </span>
        )}
      </button>
    );
  }
);

// Set the display name for better debugging and readability
ButtonComponent.displayName = "ButtonComponent";

export default ButtonComponent;
