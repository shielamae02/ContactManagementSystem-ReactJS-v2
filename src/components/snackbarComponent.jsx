import { HiBadgeCheck } from "react-icons/hi";

export default function SnackBarComponent({ favorite }) {

    return (
        <div className={`fixed flex items-center bottom-5 right-5 w-1/5 px-4 py-3  rounded" role="alert ${favorite
            ? "bg-green-100 border border-green-400 text-green-700 "
            : "bg-red-100 border border-red-400 text-red-700 "
            }`}>
            {favorite ? (
                <>
                    <HiBadgeCheck size={24} className={` mr-3 text-green-600 `} />
                    <h1 className="text-lg font-semibold">
                        Added to favorites!
                    </h1>
                </>)
                : (
                    <>
                        <HiBadgeCheck size={24} className={` mr-3 text-red-600`} />
                        <h1 className="text-lg font-semibold">
                            Removed from favorites!
                        </h1>
                    </>
                )
            }

        </div>
    )
}

