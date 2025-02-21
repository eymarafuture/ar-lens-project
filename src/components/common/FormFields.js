export const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      className={`w-100 rounded p-2 bg-transparent ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export const Select = ({
  type,
  placeholder,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <select
      className={`w-100 rounded p-2 bg-transparent ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      <option value="">Select</option>
      {options}
    </select>
  );
};

export const Button = ({ onClick, text, w = "100%", isDisabled }) => {
  return (
    <button
      className={`text-light fw-bold rounded p-2  border-0 ${
        isDisabled ? "bg-light" : "bg-theme"
      }`}
      type="button"
      disabled={isDisabled}
      style={{ width: w }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const Switch = ({ value, onChange }) => {
  return (
    // <!-- Rounded switch -->
    <label className="switch">
      <input
        type="checkbox"
        checked={value}
        value={value}
        onChange={onChange}
      />
      <span className="slider round"></span>
    </label>
  );
};
