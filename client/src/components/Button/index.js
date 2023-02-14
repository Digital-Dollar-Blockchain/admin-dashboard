import "./style.css";

const Button = ({ className, type, label, disabled, ...props }) => {
  let error = disabled;
  if (disabled instanceof Object) {
    error = Object.keys(disabled).some(key => disabled[key]);
  }

  return (
    <button
      className={`${error ? "disabled" : ""} btn ${className}`}
      type={type}
      disabled={!!error}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
