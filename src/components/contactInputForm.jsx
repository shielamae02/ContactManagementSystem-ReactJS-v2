
export const ContactInputForm = ({label, id, value, onChange}) => {
    return (
        <div className="w-full pt-2">
            <label className="block text-gray-500 font-medium text-sm mb-1" htnmlfor="firstName">
                {label}
            </label>
            <input
                className={`text-[17px] rounded-md p-3 bg-gray-200 w-full focus:border-mistyBlue focus:border-1 focus:outline-none}`}
                id = {id}
                value = {value}
                onChange = {onChange}
                type="text"
                placeholder = {label} 
                required
            />
        </div>
)
}