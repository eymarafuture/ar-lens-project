export const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="border border-secondary rounded p-2 bg-transparent"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export const Button = ({ onClick, text, w = "100%" }) => {
  return (
    <button
      className="text-light fw-bold rounded p-2 border border-0 bg-theme"
      type="button"
      style={{ width: w }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
