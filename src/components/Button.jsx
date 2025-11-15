const Button = ({
  text,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  style,
}) => {
  const buttonClasses = [
    'modern-button',
    `button-${type}`,
    `button-${size}`,
    loading && 'button-loading',
    disabled && 'button-disabled',
    icon && 'button-with-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={style}
      disabled={disabled || loading}
      aria-label={text}
    >
      <div className="button-content">
        {loading && (
          <div className="button-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className="button-icon icon-left">{icon}</span>
        )}

        <span className={`button-text ${loading ? 'text-loading' : ''}`}>
          {loading ? 'Cargando...' : text}
        </span>

        {!loading && icon && iconPosition === 'right' && (
          <span className="button-icon icon-right">{icon}</span>
        )}
      </div>

      {/* Ripple effect */}
      <div className="button-ripple"></div>

      {/* Shine effect */}
      <div className="button-shine"></div>
    </button>
  );
};

export default Button;
