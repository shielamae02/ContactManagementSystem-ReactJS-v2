import React from 'react';
import { FaHeart } from 'react-icons/fa';

export const FavoritesPageCard = (props) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 relative">
            <FaHeart className="text-red-400 absolute top-4 right-4" />

            <div className="flex flex-col justify-center items-center" onClick={props.onFavoriteCardClick}>
                <div className="bg-beige rounded-full h-24 w-24 mt-4 flex items-center justify-center text-3xl font-medium text-brown">
                    {props.firstName[0]}
                    {props.lastName[0]}
                </div>
                <div className="text-center mt-4 text-lg">
                    <p className="font-semibold">
                        {props.firstName} {props.lastName}
                    </p>
                    <p className="text-sm">{props.emailAddress}</p>
                </div>
            </div>
        </div>
    );
};
