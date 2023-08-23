export const InputField = ({ id, name, label, type, value, error, onChange }) => (
  <div className="w-full">
    <label className="block text-gray-500 text-[13px] mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      className={`text-xl rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none ${
        error ? 'border border-red-700' : ""
      }`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={label}
      required
    />
    {error && <p className="text-red-500 text-[13px]">{error}</p>}
  </div>
);