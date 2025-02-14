export const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="border border-secondary w-100 rounded p-2 bg-transparent"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export const Select = ({ type, placeholder, value, onChange, options }) => {
  return (
    <select
      className="border w-100 border-secondary rounded p-2 bg-transparent"
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
      className={`text-light fw-bold rounded p-2 border border-0 ${
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
