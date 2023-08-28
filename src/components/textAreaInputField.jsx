export const TextAreaInputField = ({ id, name, label, type, value, error, onChange }) => (
  <div className="w-full">
    <label className="block text-gray-500 text-[13px] mb-1" htmlFor={id}>
      {label}
    </label>
    <textarea
      className={`
                text-xl resize-none rounded-md p-4 bg-gray-100 w-full h-52 focus:border focus:border-mistyBlue focus:outline-none font-normal
                ${error ? 'border border-red-700' : ''}`} // Apply red border if there's an error
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
