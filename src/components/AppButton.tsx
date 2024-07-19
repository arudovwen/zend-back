// @ts-nocheck 
import React from 'react';
import Link from "next/link";
import AppIcon from "@/components/AppIcon";

interface ButtonProps {
  text?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  btnClass?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconClass?: string;
  loadingClass?: string;
  link?: string;
  div?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  isDisabled = false,
  isLoading = false,
  btnClass = 'bg-primary-500 text-white',
  icon = '',
  iconPosition = 'left',
  iconClass = 'text-[20px]',
  loadingClass = '',
  link = '',
  div = false,
  type = 'button',
  onClick
}) => {
  const buttonClasses = `
    btn inline-flex justify-center
    ${isLoading ? ' pointer-events-none' : ''}
    ${isDisabled ? ' opacity-40 cursor-not-allowed' : ''}
    ${btnClass}
  `;

  return (
    <>
    
      {!link && !div && (
        <button
          disabled={isDisabled}
          type={type}
          className={buttonClasses}
          data-testid="btn"
          onClick={onClick}
        >
          {!isLoading && !text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              {text && <span className="leading-normal text-sm">{text}</span>}
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
          {isLoading && (
            <>
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading ...
            </>
          )}
          {!isLoading && text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              <span>{text}</span>
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
        </button>
      )}

      {link && !div && (
        <Link href={link} className={buttonClasses}>
          {!isLoading && !text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              {text && <span>{text}</span>}
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
          {isLoading && (
            <>
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading ...
            </>
          )}
          {!isLoading && text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              <span>{text}</span>
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
        </Link>
      )}

      {div && !link && (
        <div className={buttonClasses}>
          {!isLoading && !text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              {text && <span>{text}</span>}
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
          {isLoading && (
            <>
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 ${loadingClass}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading ...
            </>
          )}
          {!isLoading && text && (
            <span className="flex items-center">
              {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
              <span>{text}</span>
              {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconClass}`}>
                  <AppIcon icon={icon} />
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Button;
