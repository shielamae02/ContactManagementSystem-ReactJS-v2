import { HiBadgeCheck } from "react-icons/hi";

export default function SnackBarComponent({ favorite, contactId }) {
    const message = favorite ? 'Added to favorites!' : 'Removed from favorites!';

    return (
        <div className={`fixed flex items-center bottom-5 right-5 w-1/5 px-4 py-3 rounded" role="alert ${favorite
            ? "bg-green-100 border border-green-400 text-green-700 "
            : "bg-red-100 border border-red-400 text-red-700 "
            }`}>
            <HiBadgeCheck size={24} className={`mr-3 ${favorite ? 'text-green-600' : 'text-red-600'}`} />
            <h1 className="text-lg font-semibold">
                {message}
            </h1>
        </div>
    );
}
