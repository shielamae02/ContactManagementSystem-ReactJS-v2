import { HiBadgeCheck } from "react-icons/hi";

export default function SnackBarComponent ({ message }) {
     return (
        <div class="fixed flex items-center bottom-5 right-5 w-1/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
            <HiBadgeCheck size={24} className="text-green-600 mr-3" />
            <h1 className="text-lg font-semibold">
                {message}
            </h1>
            {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                close button
            </span> */}
        </div>
    )
}