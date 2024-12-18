import React from 'react';

export default function IterateIcons({ arr }) {
    return (
        <div>
            {arr.map((item, index) => {
                return <div key={index}>{item}</div>;
            })}
        </div>
    );
}
