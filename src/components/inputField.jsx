export const InputField = ({ id, name, label, type, value, error, onChange }) => (
  <div className="w-full">
    <label className="block text-gray-500 text-sm mb-1" htmlFor={id}>
      {label}
    </label>
    <input
      className={`text-lg rounded-md p-4 bg-gray-100 w-full focus:border focus:border-mistyBlue focus:outline-none font-normal ${error ? 'border border-red-700' : '' // Apply red border only if there is an error
        }`}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={label}
    />
    {error && <p className="text-red-500 text-[13px]">{error}</p>}
  </div>
);
