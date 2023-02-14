import "./style.css";

const Input = ({ className = "", type = "text", error, label, icon, ...props }) => {
  return (
    <div className={`input-container ${className}`}>
      <label className="">{label}</label>
      <div className="input-box">
        <div className="icon">{icon}</div>
        <input className={`${error && error[type] ? "input-error" : ""}`} {...props} type={type} />
      </div>
      <div className="error">{(error && error.required) || (error && (error[type] || ""))}</div>
    </div>
  );
};

export default Input;