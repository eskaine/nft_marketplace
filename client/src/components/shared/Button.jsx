import React from 'react';

function Button(props) {
    return (
        <button className={`rounded-full px-4 py-2 text-white ${props.bgColor}`} onClick={props.onClick}>
            {props.name}
        </button>
    )
};

export default Button;