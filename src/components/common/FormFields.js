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

export const Button = ({ onClick, text }) => {
  return (
    <button
      className="text-light fw-bold rounded p-2 border border-0"
      type="button"
      style={{ backgroundColor: "var(--themeColor--)" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
